import WebsiteForm from '@/components/admin/WebsiteForm';

export default function NewWebsitePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">New Website</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Fill in the details below. Save as Draft to come back later, or Publish to make it live.
        </p>
      </div>
      <WebsiteForm mode="create" />
    </div>
  );
}
