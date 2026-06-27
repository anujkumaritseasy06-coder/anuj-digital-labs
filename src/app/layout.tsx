import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SkipLink from "@/components/SkipLink";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = "https://anujdigitallabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Anuj Digital Labs | Building Smart Digital Solutions",
    template: "%s | Anuj Digital Labs",
  },
  description:
    "Anuj Digital Labs develops high-quality Android apps, modern websites, AI-powered tools, and custom business software. We build smart, scalable digital solutions for organizations of all sizes.",
  keywords: [
    "Android app development",
    "web development",
    "AI solutions",
    "business software",
    "digital tools",
    "mobile apps",
    "software development",
    "Anuj Digital Labs",
  ],
  authors: [{ name: "Anuj Digital Labs", url: BASE_URL }],
  creator: "Anuj Digital Labs",
  publisher: "Anuj Digital Labs",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Anuj Digital Labs",
    title: "Anuj Digital Labs | Building Smart Digital Solutions",
    description:
      "We develop Android apps, modern websites, AI-powered tools, and custom business software. Smart. Scalable. Reliable.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Digital Labs | Building Smart Digital Solutions",
    description:
      "Android apps, web development, AI tools, and business software solutions by Anuj Digital Labs.",
    site: "@anujdigitallabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google/Bing site verification tokens here when available
    // google: "your-token",
  },
};

/** Schema.org Organization + WebSite structured data */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Anuj Digital Labs",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.ico`,
      },
      description:
        "Anuj Digital Labs develops Android apps, modern websites, AI-powered tools, and custom business software.",
      areaServed: "Worldwide",
      knowsAbout: [
        "Android App Development",
        "Web Development",
        "Artificial Intelligence",
        "Business Software",
      ],
      sameAs: [BASE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Anuj Digital Labs",
      description: "Official website of Anuj Digital Labs",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/faq?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-700 antialiased overflow-x-hidden">
        <SkipLink />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
