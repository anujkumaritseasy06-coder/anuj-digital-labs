'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/media');
    const data = await res.json();
    setFiles(data.files ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const uploadFile = async (file: File) => {
    setUploadError('');
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) { setUploadError(data.error || 'Upload failed'); }
    else { fetchFiles(); }
    setUploading(false);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    uploadFile(fileList[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (name: string) => {
    await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    setDeleteTarget(null);
    fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Media Library</h2>
        <p className="text-slate-500 text-sm mt-0.5">{files.length} file{files.length !== 1 ? 's' : ''} uploaded</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col items-center justify-center gap-3 py-10 rounded-2xl cursor-pointer transition-all duration-200"
        style={{
          border: `2px dashed ${dragOver ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
          background: dragOver ? 'rgba(16,185,129,0.05)' : 'rgba(15,23,42,0.4)',
        }}
      >
        {uploading ? (
          <div className="flex items-center gap-3 text-slate-400">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading…
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)' }}>
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-slate-300 text-sm font-medium">
                <span className="text-emerald-400">Click to upload</span> or drag & drop
              </p>
              <p className="text-slate-600 text-xs mt-1">PNG, JPG, WebP, GIF — max 5 MB</p>
            </div>
          </>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />

      {uploadError && (
        <p className="text-red-400 text-sm px-1">{uploadError}</p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading…</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p>No files yet. Upload your first image above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="group relative rounded-xl overflow-hidden"
              style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="aspect-square overflow-hidden">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
              >
                <button
                  onClick={() => copyUrl(file.url)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:-translate-y-px"
                  style={{ background: copiedUrl === file.url ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.1)' }}
                  title="Copy URL"
                >
                  {copiedUrl === file.url ? (
                    <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg> Copied!</>
                  ) : (
                    <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg> Copy URL</>
                  )}
                </button>
                <button
                  onClick={() => setDeleteTarget(file.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 hover:text-red-200 transition-colors"
                  style={{ background: 'rgba(239,68,68,0.1)' }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>

              {/* Footer */}
              <div className="px-2 py-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-slate-400 text-[10px] truncate">{file.name}</p>
                <p className="text-slate-600 text-[10px]">{formatBytes(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog" aria-modal="true"
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={() => setDeleteTarget(null)}
          />
          <div
            className="relative w-full max-w-sm rounded-2xl p-6 z-10"
            style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
          >
            <h3 className="text-white font-bold text-lg mb-2">Delete Image</h3>
            <p className="text-slate-400 text-sm mb-6">
              Permanently delete <code className="text-emerald-400">{deleteTarget}</code>?
              Any apps using this image will show a broken image.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)', boxShadow: '0 0 16px rgba(239,68,68,0.3)' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
