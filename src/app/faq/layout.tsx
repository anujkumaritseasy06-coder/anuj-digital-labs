import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Anuj Digital Labs",
  description:
    "Frequently asked questions about Anuj Digital Labs — what we do, how to contact support, where to download our apps, and how to collaborate with us.",
  openGraph: {
    title: "FAQ | Anuj Digital Labs",
    description:
      "Common questions about Anuj Digital Labs, our software products, support channels, and collaboration opportunities.",
    url: "https://anujdigitallabs.com/faq",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Anuj Digital Labs",
    description: "Answers to common questions about Anuj Digital Labs and our products.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
