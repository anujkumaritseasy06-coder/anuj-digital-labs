'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminApp, AppCategory, PublishStatus, ReleaseStatus } from '@/types/admin';
import ImageUploader from './ImageUploader';

const CATEGORIES: AppCategory[] = [
  'Android', 'AI', 'Productivity', 'Business', 'Education', 'Health', 
  'Finance', 'Utility', 'Calculator', 'Tools', 'Document', 'Scanner', 'Offline'
];

type FormData = Omit<AdminApp, 'id' | 'createdAt' | 'updatedAt'>;

const DEFAULT_FORM: FormData = {
  name: '',
  category: 'Android',
  bannerUrl: '',
  playStoreUrl: '',
  websiteUrl: '',
  featured: false,
  displayOrder: 0,
  publishStatus: 'draft',
  releaseStatus: 'available',
  themeColor: '#10b981',
  hoverColor: '#34d399',
};

interface AppFormProps {
  initial?: AdminApp;
  mode: 'create' | 'edit';
}

function Field({ label, children, required, hint }: {
  label: string; children: React.ReactNode; required?: boolean; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-slate-500 text-xs">{hint}</p>}
    </div>
  );
}

const inputCls = `w-full px-3 py-2.5 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all`;
const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ''}`} style={inputStyle} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className ?? ''}`} style={{ ...inputStyle, colorScheme: 'dark' }} />;
}

export default function AppForm({ initial, mode }: AppFormProps) {
  const router = useRouter();
  const [form, setFormState] = useState<FormData>(initial ? { ...initial } : DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setForm = (update: Partial<FormData>) => setFormState(prev => ({ ...prev, ...update }));

  const handleSubmit = async (e: React.FormEvent, publishStatus?: PublishStatus) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.bannerUrl) {
      setError('Please fill in all required fields (Name, Category, Banner Image).');
      return;
    }
    setError('');
    setSaving(true);
    
    const finalForm = { ...form };
    if (publishStatus) finalForm.publishStatus = publishStatus;

    try {
      const url = mode === 'create' ? '/api/admin/apps' : `/api/admin/apps/${initial!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalForm),
      });

      if (!res.ok) throw new Error(await res.text());
      router.push('/admin/apps');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-3xl space-y-6">
      {error && (
        <div className="p-4 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          {error}
        </div>
      )}

      <div className="p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-5" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="md:col-span-2">
          <Field label="App Name" required>
            <Input value={form.name} onChange={e => setForm({ name: e.target.value })} maxLength={100} placeholder="e.g. My Awesome App" />
          </Field>
        </div>
        
        <div>
          <Field label="Category" required>
            <Select value={form.category} onChange={e => setForm({ category: e.target.value as AppCategory })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
        </div>

        <div>
          <Field label="App Status" required>
            <Select value={form.releaseStatus} onChange={e => setForm({ releaseStatus: e.target.value as ReleaseStatus })}>
              <option value="available">Available</option>
              <option value="coming-soon">Coming Soon</option>
            </Select>
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Banner Image" required hint="Used on the portfolio card.">
            <ImageUploader id="bannerUrl" label="Upload Banner Image" value={form.bannerUrl || ''} onChange={url => setForm({ bannerUrl: url })} uploadHint="screenshot" />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Google Play URL" hint="Direct link to the Google Play Store (opens in new tab).">
            <Input value={form.playStoreUrl || ''} onChange={e => setForm({ playStoreUrl: e.target.value })} placeholder="https://play.google.com/..." />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="External Website URL" hint="Landing page link (used if Play Store link is missing).">
            <Input value={form.websiteUrl || ''} onChange={e => setForm({ websiteUrl: e.target.value })} placeholder="https://..." />
          </Field>
        </div>

        <div>
          <Field label="Featured">
            <label className="flex items-center gap-2 mt-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ featured: e.target.checked })}
                className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
              />
              Display prominently in the gallery
            </label>
          </Field>
        </div>

        <div>
          <Field label="Sort Order" hint="Lower numbers appear first">
            <Input type="number" value={form.displayOrder} onChange={e => setForm({ displayOrder: parseInt(e.target.value) || 0 })} />
          </Field>
        </div>

        <div>
          <Field label="Glow Color" hint="Custom color for the card's glowing border.">
            <div className="flex items-center gap-3 mt-1">
              <input 
                type="color" 
                value={form.themeColor || '#10b981'} 
                onChange={e => setForm({ themeColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent" 
              />
              <Input 
                type="text" 
                value={form.themeColor || '#10b981'} 
                onChange={e => setForm({ themeColor: e.target.value })}
                className="flex-1 uppercase font-mono text-xs" 
                placeholder="#10b981" 
              />
            </div>
          </Field>
        </div>

        <div>
          <Field label="Hover Text Color" hint="Color for text and icons when card is hovered.">
            <div className="flex items-center gap-3 mt-1">
              <input 
                type="color" 
                value={form.hoverColor || '#34d399'} 
                onChange={e => setForm({ hoverColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent" 
              />
              <Input 
                type="text" 
                value={form.hoverColor || '#34d399'} 
                onChange={e => setForm({ hoverColor: e.target.value })}
                className="flex-1 uppercase font-mono text-xs" 
                placeholder="#34d399" 
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'draft')}
          disabled={saving}
          className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-300 transition-all hover:-translate-y-px disabled:opacity-50"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'published')}
          disabled={saving}
          className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}
        >
          {saving ? 'Saving...' : 'Publish App'}
        </button>
      </div>
    </form>
  );
}
