import { notFound } from 'next/navigation';
import { getApp } from '@/lib/db';
import AppForm from '@/components/admin/AppForm';

export const dynamic = 'force-dynamic';

export default async function EditAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApp(id);
  if (!app) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Edit App</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Editing <span className="text-emerald-400 font-medium">{app.name}</span>
        </p>
      </div>
      <AppForm mode="edit" initial={app} />
    </div>
  );
}
