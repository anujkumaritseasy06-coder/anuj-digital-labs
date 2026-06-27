'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  AdminApp, AppCategory, AppPlatform, PublishStatus, ReleaseStatus,
  AppBenefit, AppStep, AppFAQ, AppChangelog,
} from '@/types/admin';
import ImageUploader from './ImageUploader';

const CATEGORIES: AppCategory[] = [
  'Productivity', 'Utilities', 'Business', 'AI Tools',
  'Finance', 'Education', 'Health', 'Lifestyle', 'Other',
];
const PLATFORMS: AppPlatform[] = ['Android', 'Web', 'Android & Web'];
const TABS = ['Basic', 'Features', 'Media', 'Links', 'Content', 'Advanced', 'Settings', 'SEO'] as const;
type Tab = (typeof TABS)[number];

type FormData = Omit<AdminApp, 'id' | 'createdAt' | 'updatedAt'>;

const DEFAULT_FORM: FormData = {
  name: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  tagline: '',
  category: 'Utilities',
  platform: 'Android',
  version: '',
  keyFeatures: [''],
  benefits: [],
  howItWorks: [],
  iconUrl: '',
  bannerUrl: '',
  screenshots: [],
  playStoreUrl: '',
  websiteUrl: '',
  learnMoreHref: '',
  privacyPolicyUrl: '',
  supportUrl: '',
  publishStatus: 'draft',
  releaseStatus: 'coming-soon',
  featured: false,
  displayOrder: 0,
  themeColor: '#10b981',
  faqs: [],
  changelog: [],
  seoTitle: '',
  seoDescription: '',
  ogImageUrl: '',
};

interface AppFormProps {
  initial?: AdminApp;
  mode: 'create' | 'edit';
}

// ── Input helpers ─────────────────────────────────────────────────────────────

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

const inputCls = `w-full px-3 py-2.5 rounded-xl text-sm text-slate-200 placeholder-slate-600
  outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all`;
const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ''}`} style={inputStyle} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 4} className={`${inputCls} ${props.className ?? ''} resize-none`} style={inputStyle} />;
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputCls} ${props.className ?? ''}`}
      style={{ ...inputStyle, colorScheme: 'dark' }}
    />
  );
}

// ── Generate slug from name ───────────────────────────────────────────────────

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── Tab: Basic ────────────────────────────────────────────────────────────────

function BasicTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2">
        <Field label="App Name" required>
          <Input
            id="field-name"
            placeholder="My Awesome App"
            value={form.name}
            onChange={(e) => {
              const name = e.target.value;
              set({
                name,
                // Auto-fill slug if not manually overridden in create mode
                slug: form.slug === nameToSlug(form.name) || !form.slug
                  ? nameToSlug(name)
                  : form.slug,
              });
            }}
            maxLength={100}
          />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Tagline" hint="A short, catchy one-liner shown prominently on the detail page.">
          <Input
            id="field-tagline"
            placeholder="The fastest way to prepare your documents."
            value={form.tagline}
            onChange={(e) => set({ tagline: e.target.value })}
            maxLength={120}
          />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Short Description" required hint="Shown on the app card. Keep it under 160 characters.">
          <Textarea
            id="field-shortDescription"
            rows={2}
            placeholder="A brief, compelling description of what this app does."
            value={form.shortDescription}
            maxLength={200}
            onChange={(e) => set({ shortDescription: e.target.value })}
          />
          <p className="text-right text-xs text-slate-600 mt-1">{form.shortDescription.length}/200</p>
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Full Description" hint="Detailed description shown in the 'Why This App' section of the detail page.">
          <Textarea
            id="field-fullDescription"
            rows={6}
            placeholder="A detailed description of the app, its purpose, and what users can expect."
            value={form.fullDescription}
            onChange={(e) => set({ fullDescription: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Category" required>
        <Select
          id="field-category"
          value={form.category}
          onChange={(e) => set({ category: e.target.value as AppCategory })}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>
      <Field label="Platform" required>
        <Select
          id="field-platform"
          value={form.platform}
          onChange={(e) => set({ platform: e.target.value as AppPlatform })}
        >
          {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </Select>
      </Field>
      <Field label="Version" hint="e.g. 1.0.0">
        <Input
          id="field-version"
          placeholder="1.0.0"
          value={form.version}
          onChange={(e) => set({ version: e.target.value })}
        />
      </Field>
    </div>
  );
}

// ── Tab: Features ─────────────────────────────────────────────────────────────

function FeaturesTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  const features = form.keyFeatures.length ? form.keyFeatures : [''];

  const updateFeature = (i: number, val: string) => {
    const updated = [...features];
    updated[i] = val;
    set({ keyFeatures: updated });
  };
  const addFeature = () => set({ keyFeatures: [...features, ''] });
  const removeFeature = (i: number) => {
    if (features.length === 1) return;
    set({ keyFeatures: features.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-3">
      <p className="text-slate-400 text-sm">
        Add 3–5 key features. These appear as bullet points on the public app card and detail page.
      </p>
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-sm w-5 text-center">{i + 1}</span>
          <Input
            id={`field-feature-${i}`}
            placeholder={`Feature ${i + 1} — e.g. "Document Scanning • Capture via camera • Import from gallery"`}
            value={f}
            onChange={(e) => updateFeature(i, e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => removeFeature(i)}
            disabled={features.length === 1}
            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Remove feature"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addFeature}
        disabled={features.length >= 8}
        className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Feature
      </button>
    </div>
  );
}

// ── Tab: Media ────────────────────────────────────────────────────────────────

function MediaTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  const addScreenshot = (url: string) => {
    if (url && !form.screenshots.includes(url)) {
      set({ screenshots: [...form.screenshots, url] });
    }
  };
  const removeScreenshot = (url: string) => {
    set({ screenshots: form.screenshots.filter((s) => s !== url) });
  };

  return (
    <div className="space-y-8">
      <ImageUploader
        id="field-iconUrl"
        label="App Icon"
        value={form.iconUrl}
        onChange={(url) => set({ iconUrl: url })}
        hint="PNG or WebP, square format recommended (512×512). Max 10 MB."
        uploadHint="icon"
      />

      <ImageUploader
        id="field-bannerUrl"
        label="Hero Banner (Optional)"
        value={form.bannerUrl}
        onChange={(url) => set({ bannerUrl: url })}
        hint="Wide banner image used as the hero background on the detail page. 1920×1080 recommended."
        uploadHint="screenshot"
      />

      <div>
        <p className="text-sm font-medium text-slate-300 mb-2">Screenshots</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {form.screenshots.map((url, i) => (
            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden">
              <img src={url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeScreenshot(url)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.6)' }}
                aria-label={`Remove screenshot ${i + 1}`}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <ImageUploader
          id="field-screenshot-add"
          label="Add Screenshot"
          value=""
          onChange={addScreenshot}
          hint="Upload a screenshot. You can add multiple."
          uploadHint="screenshot"
        />
      </div>
    </div>
  );
}

// ── Tab: Links ────────────────────────────────────────────────────────────────

function LinksTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Play Store URL" hint="Full Google Play Store URL for this app.">
        <Input
          id="field-playStoreUrl"
          type="url"
          placeholder="https://play.google.com/store/apps/details?id=..."
          value={form.playStoreUrl}
          onChange={(e) => set({ playStoreUrl: e.target.value })}
        />
      </Field>
      <Field label="Website URL" hint="Official website or landing page for this app.">
        <Input
          id="field-websiteUrl"
          type="url"
          placeholder="https://..."
          value={form.websiteUrl}
          onChange={(e) => set({ websiteUrl: e.target.value })}
        />
      </Field>
      <Field label="Learn More URL" hint="Leave blank — the detail page at /apps/[slug] is used automatically.">
        <Input
          id="field-learnMoreHref"
          placeholder="/apps/my-app or https://..."
          value={form.learnMoreHref}
          onChange={(e) => set({ learnMoreHref: e.target.value })}
        />
      </Field>
      <Field label="Privacy Policy URL" hint="Link to the app's privacy policy page.">
        <Input
          id="field-privacyPolicyUrl"
          type="url"
          placeholder="https://anujdigitallabs.com/privacy-policy"
          value={form.privacyPolicyUrl}
          onChange={(e) => set({ privacyPolicyUrl: e.target.value })}
        />
      </Field>
      <Field label="Support URL" hint="Link to a support page, form, or email.">
        <Input
          id="field-supportUrl"
          placeholder="https://... or mailto:support@..."
          value={form.supportUrl}
          onChange={(e) => set({ supportUrl: e.target.value })}
        />
      </Field>
    </div>
  );
}

// ── Tab: Content (Benefits + How It Works) ────────────────────────────────────

function ContentTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  const benefits: AppBenefit[] = form.benefits ?? [];
  const steps: AppStep[] = form.howItWorks ?? [];

  const updateBenefit = (i: number, field: keyof AppBenefit, val: string) => {
    const updated = [...benefits];
    updated[i] = { ...updated[i], [field]: val };
    set({ benefits: updated });
  };
  const addBenefit = () => set({ benefits: [...benefits, { icon: '✨', title: '', description: '' }] });
  const removeBenefit = (i: number) => set({ benefits: benefits.filter((_, idx) => idx !== i) });

  const updateStep = (i: number, field: keyof AppStep, val: string) => {
    const updated = [...steps];
    updated[i] = { ...updated[i], [field]: val };
    set({ howItWorks: updated });
  };
  const addStep = () => set({ howItWorks: [...steps, { icon: '01', title: '', description: '' }] });
  const removeStep = (i: number) => set({ howItWorks: steps.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-10">
      {/* Benefits */}
      <div>
        <p className="text-white font-bold text-base mb-1">Benefits / Why This App</p>
        <p className="text-slate-400 text-sm mb-4">
          Explain the value proposition. Shown in a grid of cards on the detail page.
        </p>
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <Field label="Icon (emoji)">
                  <Input
                    id={`benefit-icon-${i}`}
                    value={b.icon}
                    onChange={(e) => updateBenefit(i, 'icon', e.target.value)}
                    placeholder="✨"
                    className="w-20"
                  />
                </Field>
                <div className="flex-1">
                  <Field label="Title">
                    <Input
                      id={`benefit-title-${i}`}
                      value={b.title}
                      onChange={(e) => updateBenefit(i, 'title', e.target.value)}
                      placeholder="Saves Time"
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeBenefit(i)}
                  className="self-end mb-0.5 p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  aria-label={`Remove benefit ${i + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Field label="Description">
                <Textarea
                  id={`benefit-desc-${i}`}
                  rows={2}
                  value={b.description}
                  onChange={(e) => updateBenefit(i, 'description', e.target.value)}
                  placeholder="How this benefit helps the user..."
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            onClick={addBenefit}
            disabled={benefits.length >= 9}
            className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Benefit
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <p className="text-white font-bold text-base mb-1">How It Works</p>
        <p className="text-slate-400 text-sm mb-4">
          Animated step-by-step timeline shown on the detail page.
        </p>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <Field label="Icon/Label">
                  <Input
                    id={`step-icon-${i}`}
                    value={s.icon}
                    onChange={(e) => updateStep(i, 'icon', e.target.value)}
                    placeholder="01 or 🔍"
                    className="w-24"
                  />
                </Field>
                <div className="flex-1">
                  <Field label="Step Title">
                    <Input
                      id={`step-title-${i}`}
                      value={s.title}
                      onChange={(e) => updateStep(i, 'title', e.target.value)}
                      placeholder="Install the App"
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="self-end mb-0.5 p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  aria-label={`Remove step ${i + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Field label="Description">
                <Textarea
                  id={`step-desc-${i}`}
                  rows={2}
                  value={s.description}
                  onChange={(e) => updateStep(i, 'description', e.target.value)}
                  placeholder="What happens in this step..."
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            disabled={steps.length >= 8}
            className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Step
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Advanced (FAQs + Changelog) ─────────────────────────────────────────

function AdvancedTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  const faqs: AppFAQ[] = form.faqs ?? [];
  const changelog: AppChangelog[] = form.changelog ?? [];

  const updateFAQ = (i: number, field: keyof AppFAQ, val: string) => {
    const updated = [...faqs];
    updated[i] = { ...updated[i], [field]: val };
    set({ faqs: updated });
  };
  const addFAQ = () => set({ faqs: [...faqs, { question: '', answer: '' }] });
  const removeFAQ = (i: number) => set({ faqs: faqs.filter((_, idx) => idx !== i) });

  const updateChangelog = (i: number, field: keyof AppChangelog, val: string | string[]) => {
    const updated = [...changelog];
    updated[i] = { ...updated[i], [field]: val };
    set({ changelog: updated });
  };
  const addChangelog = () => set({
    changelog: [{
      version: '',
      date: new Date().toISOString().split('T')[0],
      whatsNew: [],
      bugFixes: [],
    }, ...changelog],
  });
  const removeChangelog = (i: number) => set({ changelog: changelog.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-10">
      {/* FAQs */}
      <div>
        <p className="text-white font-bold text-base mb-1">FAQ</p>
        <p className="text-slate-400 text-sm mb-4">
          Frequently asked questions. Shown as an accordion on the detail page.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-3">
                  <Field label="Question">
                    <Input
                      id={`faq-q-${i}`}
                      value={faq.question}
                      onChange={(e) => updateFAQ(i, 'question', e.target.value)}
                      placeholder="Is this app free to use?"
                    />
                  </Field>
                  <Field label="Answer">
                    <Textarea
                      id={`faq-a-${i}`}
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateFAQ(i, 'answer', e.target.value)}
                      placeholder="Yes, the app is completely free..."
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeFAQ(i)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all mt-6"
                  aria-label={`Remove FAQ ${i + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addFAQ}
            className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add FAQ
          </button>
        </div>
      </div>

      {/* Changelog */}
      <div>
        <p className="text-white font-bold text-base mb-1">Changelog</p>
        <p className="text-slate-400 text-sm mb-4">
          Version history shown as a timeline on the detail page. New entries go at the top.
        </p>
        <div className="space-y-4">
          {changelog.map((entry, i) => (
            <div
              key={i}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <Field label="Version">
                  <Input
                    id={`cl-version-${i}`}
                    value={entry.version}
                    onChange={(e) => updateChangelog(i, 'version', e.target.value)}
                    placeholder="1.0.0"
                    className="w-28"
                  />
                </Field>
                <Field label="Date">
                  <Input
                    id={`cl-date-${i}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateChangelog(i, 'date', e.target.value)}
                  />
                </Field>
                <button
                  type="button"
                  onClick={() => removeChangelog(i)}
                  className="self-end mb-0.5 p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  aria-label={`Remove changelog entry ${i + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Field label="What's New (one per line)">
                <Textarea
                  id={`cl-new-${i}`}
                  rows={3}
                  value={entry.whatsNew.join('\n')}
                  onChange={(e) => updateChangelog(i, 'whatsNew', e.target.value.split('\n').filter(Boolean))}
                  placeholder={"Added document scanning\nSupport for PDF export"}
                />
              </Field>
              <Field label="Bug Fixes (one per line)">
                <Textarea
                  id={`cl-fixes-${i}`}
                  rows={2}
                  value={entry.bugFixes.join('\n')}
                  onChange={(e) => updateChangelog(i, 'bugFixes', e.target.value.split('\n').filter(Boolean))}
                  placeholder={"Fixed crash on Android 12\nResolved memory leak"}
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            onClick={addChangelog}
            className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Version
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Settings ─────────────────────────────────────────────────────────────

function SettingsTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Publication Status" hint="Draft apps are invisible to the public.">
          <Select
            id="field-publishStatus"
            value={form.publishStatus}
            onChange={(e) => set({ publishStatus: e.target.value as PublishStatus })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <Field label="Release Status" hint="The badge shown on the public app card.">
          <Select
            id="field-releaseStatus"
            value={form.releaseStatus}
            onChange={(e) => set({ releaseStatus: e.target.value as ReleaseStatus })}
          >
            <option value="coming-soon">Coming Soon</option>
            <option value="available">Available</option>
          </Select>
        </Field>
      </div>

      <Field label="URL Slug" hint="Auto-generated from app name. Determines the page URL: /apps/[slug]">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm px-3 py-2.5 rounded-l-xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRight: 'none' }}>
            /apps/
          </span>
          <Input
            id="field-slug"
            placeholder="my-app-name"
            value={form.slug}
            onChange={(e) => set({ slug: nameToSlug(e.target.value) })}
            className="rounded-l-none flex-1"
            style={{ borderRadius: '0 12px 12px 0' }}
          />
        </div>
      </Field>

      <Field label="Display Order" hint="Lower numbers appear first. Use 0 for default.">
        <Input
          id="field-displayOrder"
          type="number"
          min={0}
          value={form.displayOrder}
          onChange={(e) => set({ displayOrder: Number(e.target.value) })}
        />
      </Field>

      <Field label="Theme Color" hint="Accent color used for card glow, buttons, and detail page accents.">
        <div className="flex items-center gap-3">
          <input
            id="field-themeColor"
            type="color"
            value={form.themeColor}
            onChange={(e) => set({ themeColor: e.target.value })}
            className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
          <Input
            value={form.themeColor}
            onChange={(e) => set({ themeColor: e.target.value })}
            placeholder="#10b981"
            className="w-36"
          />
          <div
            className="w-8 h-8 rounded-xl flex-shrink-0"
            style={{ background: form.themeColor }}
            aria-hidden="true"
          />
        </div>
      </Field>

      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className="relative w-11 h-6 rounded-full transition-all duration-200"
            style={{ background: form.featured ? '#059669' : 'rgba(255,255,255,0.1)' }}
            onClick={() => set({ featured: !form.featured })}
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
              style={{ transform: form.featured ? 'translateX(20px)' : 'translateX(0)' }}
            />
          </div>
          <input
            id="field-featured"
            type="checkbox"
            className="sr-only"
            checked={form.featured}
            onChange={(e) => set({ featured: e.target.checked })}
          />
          <div>
            <p className="text-sm font-medium text-slate-300">Featured App</p>
            <p className="text-xs text-slate-500">Highlighted in the featured section at the top of /apps.</p>
          </div>
        </label>
      </div>
    </div>
  );
}

// ── Tab: SEO ──────────────────────────────────────────────────────────────────

function SEOTab({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <Field label="SEO Title" hint="Defaults to the app name if left blank. Recommended: 50–60 characters.">
        <Input
          id="field-seoTitle"
          placeholder={form.name || 'App Name | Anuj Digital Labs'}
          value={form.seoTitle}
          maxLength={80}
          onChange={(e) => set({ seoTitle: e.target.value })}
        />
        <p className="text-right text-xs text-slate-600 mt-1">{form.seoTitle.length}/80</p>
      </Field>
      <Field label="SEO Description" hint="Recommended: 150–160 characters.">
        <Textarea
          id="field-seoDescription"
          rows={3}
          placeholder={form.shortDescription || 'Describe this app for search engines.'}
          value={form.seoDescription}
          maxLength={200}
          onChange={(e) => set({ seoDescription: e.target.value })}
        />
        <p className="text-right text-xs text-slate-600 mt-1">{form.seoDescription.length}/200</p>
      </Field>
      <Field label="OG Image URL" hint="Custom Open Graph image (1200×630). Falls back to app icon.">
        <Input
          id="field-ogImageUrl"
          type="url"
          placeholder="https://..."
          value={form.ogImageUrl}
          onChange={(e) => set({ ogImageUrl: e.target.value })}
        />
      </Field>
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────

export default function AppForm({ initial, mode }: AppFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Basic');
  const [form, setForm] = useState<FormData>(() =>
    initial
      ? {
          name: initial.name,
          slug: initial.slug || '',
          shortDescription: initial.shortDescription,
          fullDescription: initial.fullDescription,
          tagline: initial.tagline || '',
          category: initial.category,
          platform: initial.platform,
          version: initial.version,
          keyFeatures: initial.keyFeatures.length ? initial.keyFeatures : [''],
          benefits: initial.benefits || [],
          howItWorks: initial.howItWorks || [],
          iconUrl: initial.iconUrl,
          bannerUrl: initial.bannerUrl || '',
          screenshots: initial.screenshots,
          playStoreUrl: initial.playStoreUrl,
          websiteUrl: initial.websiteUrl,
          learnMoreHref: initial.learnMoreHref,
          privacyPolicyUrl: initial.privacyPolicyUrl || '',
          supportUrl: initial.supportUrl || '',
          publishStatus: initial.publishStatus,
          releaseStatus: initial.releaseStatus,
          featured: initial.featured,
          displayOrder: initial.displayOrder,
          themeColor: initial.themeColor || '#10b981',
          faqs: initial.faqs || [],
          changelog: initial.changelog || [],
          seoTitle: initial.seoTitle,
          seoDescription: initial.seoDescription,
          ogImageUrl: initial.ogImageUrl || '',
        }
      : DEFAULT_FORM
  );
  const [saving, setSaving] = useState<false | 'draft' | 'published'>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const set = (partial: Partial<FormData>) => setForm((prev) => ({ ...prev, ...partial }));

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!form.name.trim()) errs.push('App Name is required.');
    if (!form.shortDescription.trim()) errs.push('Short Description is required.');
    if (!form.category) errs.push('Category is required.');
    if (!form.platform) errs.push('Platform is required.');
    return errs;
  };

  const handleSave = async (publishStatus: PublishStatus) => {
    const errs = validate();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setSaving(publishStatus);

    const payload = {
      ...form,
      publishStatus,
      keyFeatures: form.keyFeatures.filter(Boolean),
    };

    try {
      const url = mode === 'edit' ? `/api/admin/apps/${initial!.id}` : '/api/admin/apps';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      router.push('/admin/apps');
      router.refresh();
    } catch (e: unknown) {
      setErrors([e instanceof Error ? e.message : 'Failed to save app']);
    } finally {
      setSaving(false);
    }
  };

  const TAB_COMPONENTS: Record<Tab, React.ReactNode> = {
    Basic: <BasicTab form={form} set={set} />,
    Features: <FeaturesTab form={form} set={set} />,
    Media: <MediaTab form={form} set={set} />,
    Links: <LinksTab form={form} set={set} />,
    Content: <ContentTab form={form} set={set} />,
    Advanced: <AdvancedTab form={form} set={set} />,
    Settings: <SettingsTab form={form} set={set} />,
    SEO: <SEOTab form={form} set={set} />,
  };

  return (
    <div className="max-w-4xl">
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            id={`tab-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              background: activeTab === tab ? 'rgba(16,185,129,0.15)' : 'transparent',
              color: activeTab === tab ? '#10b981' : '#64748b',
              border: activeTab === tab ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="p-6 rounded-2xl mb-6"
        style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {TAB_COMPONENTS[activeTab]}
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div
          className="mb-4 p-4 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
        >
          {errors.map((e) => (
            <p key={e} className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {e}
            </p>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          id="btn-save-draft"
          type="button"
          onClick={() => handleSave('draft')}
          disabled={!!saving}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {saving === 'draft' ? 'Saving…' : '💾 Save as Draft'}
        </button>
        <button
          id="btn-publish"
          type="button"
          onClick={() => handleSave('published')}
          disabled={!!saving}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #059669, #10b981)',
            boxShadow: '0 0 20px rgba(16,185,129,0.3)',
          }}
        >
          {saving === 'published' ? 'Publishing…' : '🚀 Publish App'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
