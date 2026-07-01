'use client';

import { useRef, useState } from 'react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  id: string;
  /** 'icon' = square app icon (compressed to 512×512), 'screenshot' = tall screenshot (1080px wide) */
  uploadHint?: 'icon' | 'screenshot';
}

export default function ImageUploader({
  label,
  value,
  onChange,
  hint,
  id,
  uploadHint = 'screenshot',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setCompressionInfo('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('hint', uploadHint); // tell server icon vs screenshot
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
      // Show compression stats if returned
      if (data.summary) setCompressionInfo(data.summary);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          handleFile(file);
          break;
        }
      }
    }
  };

  return (
    <div onPaste={handlePaste}>
      <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor={id}>
        {label}
      </label>

      {/* Current preview */}
      {value && (
        <div className="relative mb-3 inline-block group">
          <img
            src={value}
            alt="Preview"
            className={`object-cover rounded-xl ${uploadHint === 'icon' ? 'w-24 h-24' : 'w-40 h-24'}`}
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <button
            type="button"
            onClick={() => { onChange(''); setCompressionInfo(''); }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: '#ef4444' }}
            aria-label="Remove image"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Dropzone */}
      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-2 py-6 rounded-xl cursor-pointer transition-all duration-200"
        style={{
          border: `2px dashed ${dragOver ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
          background: dragOver ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
        }}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Compressing &amp; uploading…</span>
          </div>
        ) : (
          <>
            <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-400 text-sm">
              <span className="text-emerald-400 font-medium">Click to upload</span>, drag &amp; drop, or paste
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-compressed to WebP
              {uploadHint === 'icon' ? ' · 512×512 max' : ' · 1080px wide max'}
            </p>
            {hint && <p className="text-slate-600 text-xs">{hint}</p>}
          </>
        )}
      </div>

      {/* Compression stats (shown after upload) */}
      {compressionInfo && !uploading && (
        <p className="mt-1.5 text-emerald-400 text-xs flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Compressed: {compressionInfo}
        </p>
      )}

      {/* Or URL input */}
      <div className="mt-2">
        <input
          type="url"
          placeholder="Or paste an image URL…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </div>

      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />
    </div>
  );
}
