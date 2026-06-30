'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminWebsite, WebsiteCategory, PublishStatus, WebsiteBadgeType, WebsiteFeature } from '@/types/websites';
import ImageUploader from './ImageUploader';

const CATEGORIES: WebsiteCategory[] = [
  'Business', 'Restaurant', 'Education', 'Healthcare', 'Portfolio', 
  'Landing Page', 'Corporate', 'Ecommerce', 'Blog', 'Calculator', 
  'Tools', 'SaaS', 'AI', 'Government', 'Personal', 'NGO', 'Other'
];

const BADGE_TYPES: WebsiteBadgeType[] = [
  'Featured Project', 'Premium Project', 'Editor\'s Choice', 'Innovation',
  'Trending', 'Excellence', 'Signature Project', 'New', 'None'
];

const TABS = ['Basic', 'Features & Tech', 'Media', 'Scores & Badges', 'Design', 'Links & SEO'] as const;
type Tab = (typeof TABS)[number];

type FormData = Omit<AdminWebsite, 'id' | 'createdAt' | 'updatedAt'>;

const DEFAULT_FORM: FormData = {
  name: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  tagline: '',
  category: 'Business',
  industry: '',
  clientName: '',
  completionDate: '',
  projectDuration: '',
  developerNotes: '',
  techStack: [''],
  features: [],
  designProcess: { colors: [], typography: [] },
  thumbnailUrl: '',
  gallery: { desktopScreenshots: [], tabletScreenshots: [], mobileScreenshots: [] },
  websiteUrl: '',
  sourceCodeUrl: '',
  caseStudyUrl: '',
  publishStatus: 'draft',
  scores: { performance: 0, accessibility: 0, seo: 0, security: 0, bestPractices: 0 },
  badges: ['None'],
  displayOrder: 0,
  themeColor: '#10b981',
  tags: [''],
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  ogImageUrl: '',
};

interface WebsiteFormProps {
  initial?: AdminWebsite;
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
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 4} className={`${inputCls} ${props.className ?? ''} resize-none`} style={inputStyle} />;
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className ?? ''}`} style={{ ...inputStyle, colorScheme: 'dark' }} />;
}

function nameToSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export default function WebsiteForm({ initial, mode }: WebsiteFormProps) {
  const router = useRouter();
  const [form, setFormState] = useState<FormData>(initial ? { ...initial } : DEFAULT_FORM);
  const [activeTab, setActiveTab] = useState<Tab>('Basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setForm = (update: Partial<FormData>) => setFormState(prev => ({ ...prev, ...update }));

  const handleSubmit = async (e: React.FormEvent, publishStatus?: PublishStatus) => {
    e.preventDefault();
    if (!form.name || !form.shortDescription) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSaving(true);
    
    const finalForm = { ...form };
    if (publishStatus) finalForm.publishStatus = publishStatus;

    try {
      const url = mode === 'create' ? '/api/admin/websites' : `/api/admin/websites/${initial!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalForm),
      });

      if (!res.ok) throw new Error(await res.text());
      router.push('/admin/websites');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Sidebar Tabs */}
      <div className="w-full lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
              activeTab === tab 
                ? 'text-white' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
            }`}
            style={activeTab === tab ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' } : { border: '1px solid transparent' }}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Form */}
      <form onSubmit={(e) => handleSubmit(e)} className="flex-1 min-w-0 w-full space-y-6">
        {error && (
          <div className="p-4 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        <div className="p-6 rounded-2xl" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {activeTab === 'Basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Website Name" required>
                  <Input value={form.name} onChange={e => {
                    const name = e.target.value;
                    setForm({ name, slug: mode === 'create' ? nameToSlug(name) : form.slug });
                  }} maxLength={100} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Tagline" hint="Short, catchy one-liner">
                  <Input value={form.tagline} onChange={e => setForm({ tagline: e.target.value })} maxLength={120} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Short Description" required hint="Shown on cards (max 200 chars)">
                  <Textarea value={form.shortDescription} onChange={e => setForm({ shortDescription: e.target.value })} rows={2} maxLength={200} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Full Description" hint="Detailed description for the project page">
                  <Textarea value={form.fullDescription} onChange={e => setForm({ fullDescription: e.target.value })} rows={6} />
                </Field>
              </div>
              <Field label="Category" required>
                <Select value={form.category} onChange={e => setForm({ category: e.target.value as WebsiteCategory })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Industry">
                <Input value={form.industry} onChange={e => setForm({ industry: e.target.value })} placeholder="e.g. Healthcare" />
              </Field>
              <Field label="Client Name">
                <Input value={form.clientName} onChange={e => setForm({ clientName: e.target.value })} placeholder="Optional" />
              </Field>
              <Field label="Completion Date">
                <Input value={form.completionDate} onChange={e => setForm({ completionDate: e.target.value })} placeholder="e.g. March 2024" />
              </Field>
              <Field label="Project Duration">
                <Input value={form.projectDuration} onChange={e => setForm({ projectDuration: e.target.value })} placeholder="e.g. 3 Months" />
              </Field>
              <Field label="Theme Color" hint="Used for ambient glows (Hex format)">
                <div className="flex gap-3">
                  <input type="color" value={form.themeColor} onChange={e => setForm({ themeColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
                  <Input value={form.themeColor} onChange={e => setForm({ themeColor: e.target.value })} />
                </div>
              </Field>
            </div>
          )}

          {activeTab === 'Features & Tech' && (
            <div className="space-y-8">
              {/* Tech Stack */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-slate-300">Technology Stack</label>
                  <button type="button" onClick={() => setForm({ techStack: [...form.techStack, ''] })} className="text-xs text-emerald-400 hover:underline">
                    + Add Tech
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {form.techStack.map((tech, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={tech} onChange={e => {
                        const next = [...form.techStack];
                        next[i] = e.target.value;
                        setForm({ techStack: next });
                      }} placeholder="e.g. Next.js" />
                      <button type="button" onClick={() => setForm({ techStack: form.techStack.filter((_, idx) => idx !== i) })} className="text-red-400 p-2">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-slate-300">Key Features</label>
                  <button type="button" onClick={() => setForm({ features: [...form.features, { icon: '', title: '', description: '' }] })} className="text-xs text-emerald-400 hover:underline">
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {form.features.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3 relative">
                      <button type="button" onClick={() => setForm({ features: form.features.filter((_, idx) => idx !== i) })} className="absolute top-2 right-2 text-red-400 p-1">✕</button>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                          <Input placeholder="Icon/Emoji" value={f.icon} onChange={e => { const n = [...form.features]; n[i].icon = e.target.value; setForm({ features: n }); }} />
                        </div>
                        <div className="col-span-3">
                          <Input placeholder="Title" value={f.title} onChange={e => { const n = [...form.features]; n[i].title = e.target.value; setForm({ features: n }); }} />
                        </div>
                      </div>
                      <Textarea placeholder="Description" rows={2} value={f.description} onChange={e => { const n = [...form.features]; n[i].description = e.target.value; setForm({ features: n }); }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Media' && (
            <div className="space-y-6">
              <Field label="Thumbnail" hint="Main image for the card (e.g. 800x600)">
                <ImageUploader id="thumbnailUrl" label="Thumbnail Image" value={form.thumbnailUrl || ''} onChange={url => setForm({ thumbnailUrl: url })} uploadHint="screenshot" />
              </Field>
              <div className="h-px bg-white/10 my-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Desktop Screenshots">
                  {form.gallery.desktopScreenshots.map((url, i) => (
                    <div key={i} className="mb-2 relative">
                      <img src={url} className="w-full h-24 object-cover rounded-xl" alt="" />
                      <button type="button" onClick={() => {
                        const n = [...form.gallery.desktopScreenshots]; n.splice(i, 1);
                        setForm({ gallery: { ...form.gallery, desktopScreenshots: n } });
                      }} className="absolute top-1 right-1 bg-black/50 p-1 rounded-md text-red-400">✕</button>
                    </div>
                  ))}
                  <ImageUploader id={`desktop-screenshot-${form.gallery.desktopScreenshots.length}`} label="Add Desktop Screenshot" onChange={url => setForm({ gallery: { ...form.gallery, desktopScreenshots: [...form.gallery.desktopScreenshots, url] } })} value="" uploadHint="screenshot" />
                </Field>
                <Field label="Tablet Screenshots">
                  {form.gallery.tabletScreenshots.map((url, i) => (
                    <div key={i} className="mb-2 relative">
                      <img src={url} className="w-full h-24 object-cover rounded-xl" alt="" />
                      <button type="button" onClick={() => {
                        const n = [...form.gallery.tabletScreenshots]; n.splice(i, 1);
                        setForm({ gallery: { ...form.gallery, tabletScreenshots: n } });
                      }} className="absolute top-1 right-1 bg-black/50 p-1 rounded-md text-red-400">✕</button>
                    </div>
                  ))}
                  <ImageUploader id={`tablet-screenshot-${form.gallery.tabletScreenshots.length}`} label="Add Tablet Screenshot" onChange={url => setForm({ gallery: { ...form.gallery, tabletScreenshots: [...form.gallery.tabletScreenshots, url] } })} value="" uploadHint="screenshot" />
                </Field>
                <Field label="Mobile Screenshots">
                  {form.gallery.mobileScreenshots.map((url, i) => (
                    <div key={i} className="mb-2 relative">
                      <img src={url} className="w-full h-24 object-cover rounded-xl" alt="" />
                      <button type="button" onClick={() => {
                        const n = [...form.gallery.mobileScreenshots]; n.splice(i, 1);
                        setForm({ gallery: { ...form.gallery, mobileScreenshots: n } });
                      }} className="absolute top-1 right-1 bg-black/50 p-1 rounded-md text-red-400">✕</button>
                    </div>
                  ))}
                  <ImageUploader id={`mobile-screenshot-${form.gallery.mobileScreenshots.length}`} label="Add Mobile Screenshot" onChange={url => setForm({ gallery: { ...form.gallery, mobileScreenshots: [...form.gallery.mobileScreenshots, url] } })} value="" uploadHint="screenshot" />
                </Field>
              </div>
            </div>
          )}

          {activeTab === 'Scores & Badges' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Field label="Performance (0-100)">
                  <Input type="number" min={0} max={100} value={form.scores.performance} onChange={e => setForm({ scores: { ...form.scores, performance: parseInt(e.target.value) || 0 } })} />
                </Field>
                <Field label="Accessibility (0-100)">
                  <Input type="number" min={0} max={100} value={form.scores.accessibility} onChange={e => setForm({ scores: { ...form.scores, accessibility: parseInt(e.target.value) || 0 } })} />
                </Field>
                <Field label="SEO (0-100)">
                  <Input type="number" min={0} max={100} value={form.scores.seo} onChange={e => setForm({ scores: { ...form.scores, seo: parseInt(e.target.value) || 0 } })} />
                </Field>
                <Field label="Security (0-100)">
                  <Input type="number" min={0} max={100} value={form.scores.security} onChange={e => setForm({ scores: { ...form.scores, security: parseInt(e.target.value) || 0 } })} />
                </Field>
                <Field label="Best Practices (0-100)">
                  <Input type="number" min={0} max={100} value={form.scores.bestPractices} onChange={e => setForm({ scores: { ...form.scores, bestPractices: parseInt(e.target.value) || 0 } })} />
                </Field>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <Field label="Premium Badges">
                  <div className="flex flex-wrap gap-3 mt-2">
                    {BADGE_TYPES.map(badge => (
                      <label key={badge} className="flex items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={form.badges.includes(badge)}
                          onChange={e => {
                            if (e.target.checked) {
                              setForm({ badges: [...form.badges.filter(b => b !== 'None'), badge] });
                            } else {
                              const nb = form.badges.filter(b => b !== badge);
                              setForm({ badges: nb.length === 0 ? ['None'] : nb });
                            }
                          }}
                          className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                        />
                        {badge}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          )}

          {activeTab === 'Design' && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-slate-300">Color Palette</label>
                  <button type="button" onClick={() => setForm({ designProcess: { ...form.designProcess, colors: [...form.designProcess.colors, { hex: '#000000', name: 'Primary' }] } })} className="text-xs text-emerald-400 hover:underline">
                    + Add Color
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {form.designProcess.colors.map((color, i) => (
                    <div key={i} className="flex flex-col gap-2 p-3 bg-white/5 border border-white/10 rounded-xl relative">
                      <button type="button" onClick={() => { const n = [...form.designProcess.colors]; n.splice(i, 1); setForm({ designProcess: { ...form.designProcess, colors: n } }); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
                      <input type="color" value={color.hex} onChange={e => { const n = [...form.designProcess.colors]; n[i].hex = e.target.value; setForm({ designProcess: { ...form.designProcess, colors: n } }); }} className="w-full h-10 rounded cursor-pointer" />
                      <Input value={color.name} onChange={e => { const n = [...form.designProcess.colors]; n[i].name = e.target.value; setForm({ designProcess: { ...form.designProcess, colors: n } }); }} placeholder="Color Name" className="text-center" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-slate-300">Typography</label>
                  <button type="button" onClick={() => setForm({ designProcess: { ...form.designProcess, typography: [...form.designProcess.typography, { family: '', usage: '' }] } })} className="text-xs text-emerald-400 hover:underline">
                    + Add Typography
                  </button>
                </div>
                <div className="space-y-3">
                  {form.designProcess.typography.map((type, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <Input value={type.family} onChange={e => { const n = [...form.designProcess.typography]; n[i].family = e.target.value; setForm({ designProcess: { ...form.designProcess, typography: n } }); }} placeholder="Font Family (e.g. Inter)" />
                      <Input value={type.usage} onChange={e => { const n = [...form.designProcess.typography]; n[i].usage = e.target.value; setForm({ designProcess: { ...form.designProcess, typography: n } }); }} placeholder="Usage (e.g. Headings)" />
                      <button type="button" onClick={() => { const n = [...form.designProcess.typography]; n.splice(i, 1); setForm({ designProcess: { ...form.designProcess, typography: n } }); }} className="text-red-400 p-2">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Links & SEO' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Live Website URL">
                <Input value={form.websiteUrl} onChange={e => setForm({ websiteUrl: e.target.value })} placeholder="https://" />
              </Field>
              <Field label="Source Code URL">
                <Input value={form.sourceCodeUrl} onChange={e => setForm({ sourceCodeUrl: e.target.value })} placeholder="https://github.com/..." />
              </Field>
              <Field label="Case Study URL">
                <Input value={form.caseStudyUrl} onChange={e => setForm({ caseStudyUrl: e.target.value })} placeholder="https://" />
              </Field>
              <div className="md:col-span-2 h-px bg-white/10 my-4" />
              <Field label="SEO Title">
                <Input value={form.seoTitle} onChange={e => setForm({ seoTitle: e.target.value })} />
              </Field>
              <Field label="SEO Keywords">
                <Input value={form.seoKeywords} onChange={e => setForm({ seoKeywords: e.target.value })} placeholder="Comma separated" />
              </Field>
              <div className="md:col-span-2">
                <Field label="SEO Description">
                  <Textarea value={form.seoDescription} onChange={e => setForm({ seoDescription: e.target.value })} rows={2} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Custom Slug" hint="Leave empty to auto-generate from name">
                  <Input value={form.slug} onChange={e => setForm({ slug: e.target.value })} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Tags" hint="Comma separated">
                  <Input value={form.tags.join(', ')} onChange={e => setForm({ tags: e.target.value.split(',').map(s => s.trim()) })} />
                </Field>
              </div>
            </div>
          )}
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
            {saving ? 'Saving...' : 'Publish Website'}
          </button>
        </div>
      </form>
    </div>
  );
}
