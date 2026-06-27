import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Updates | Anuj Digital Labs",
  description:
    "Product announcements, feature releases, maintenance updates, and company news from Anuj Digital Labs.",
  openGraph: {
    title: "Latest Updates | Anuj Digital Labs",
    description:
      "Stay up to date with the latest from Anuj Digital Labs — product news, releases, and announcements.",
    url: "https://anujdigitallabs.com/updates",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Updates | Anuj Digital Labs",
    description: "Product announcements, releases, and news from Anuj Digital Labs.",
  },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
