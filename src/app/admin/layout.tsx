import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Anuj Digital Labs',
  description: 'Admin panel for Anuj Digital Labs.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
