import { notFound } from 'next/navigation';
import { getWebsite } from '@/lib/websites-db';
import WebsiteForm from '@/components/admin/WebsiteForm';

export default async function EditWebsitePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const website = await getWebsite(params.id);

  if (!website) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Edit Website</h2>
        <p className="text-slate-500 text-sm mt-0.5">Update details for {website.name}.</p>
      </div>
      <WebsiteForm mode="edit" initial={website} />
    </div>
  );
}
