import AppForm from '@/components/admin/AppForm';

export default function NewAppPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">New App</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Fill in the details below. Save as Draft to come back later, or Publish to make it live.
        </p>
      </div>
      <AppForm mode="create" />
    </div>
  );
}
