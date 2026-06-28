import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Anuj Digital Labs",
  description:
    "Read the Anuj Digital Labs Terms of Service covering proper use of our applications and services, intellectual property, user responsibilities, and limitations of liability.",
  openGraph: {
    title: "Terms of Service | Anuj Digital Labs",
    description:
      "The terms governing your use of Anuj Digital Labs applications, websites, and services.",
    url: "https://anujdigitallabs.com/terms-of-service",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
};

const EFFECTIVE_DATE = "June 1, 2025";
const LAST_UPDATED = "June 26, 2026";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By downloading, installing, or using any application, website, or
          service developed by Anuj Digital Labs (&ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by
          these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to
          these Terms, do not use our Services.
        </p>
        <p>
          These Terms apply to all visitors, users, and others who access or use
          our Services. Additional terms may apply to specific applications and
          will be disclosed within those applications or their respective store
          listings.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Description of Services",
    content: (
      <>
        <p>
          Anuj Digital Labs develops and publishes a range of digital products
          and services including, but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Android mobile applications</li>
          <li>Web applications and platforms</li>
          <li>AI-powered tools and utilities</li>
          <li>Business management software</li>
          <li>Productivity and digital tools</li>
        </ul>
        <p className="mt-3">
          We reserve the right to modify, suspend, or discontinue any Service
          at any time with or without notice. We shall not be liable to you or
          any third party for any such modifications, suspensions, or
          discontinuations.
        </p>
      </>
    ),
  },
  {
    id: "proper-use",
    title: "Proper Use of Services",
    content: (
      <>
        <p>
          You agree to use our Services only for lawful purposes and in a manner
          that does not infringe the rights of others or restrict their use and
          enjoyment of the Services. Prohibited conduct includes, but is not
          limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>
            Using any Service in a way that violates applicable local, national,
            or international laws or regulations
          </li>
          <li>
            Attempting to gain unauthorized access to any part of our Services,
            servers, or networks
          </li>
          <li>
            Reverse-engineering, decompiling, or disassembling any application
            except as permitted by applicable law
          </li>
          <li>
            Uploading or transmitting malicious code, viruses, or any content
            designed to disrupt or harm our Services or other users
          </li>
          <li>
            Using automated means (bots, scrapers) to access our Services
            without express prior written consent
          </li>
          <li>
            Impersonating any person, organization, or entity
          </li>
        </ul>
        <p className="mt-3">
          We reserve the right to terminate or restrict access to any user who
          violates these Terms.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          All applications, software, code, designs, graphics, text, and other
          content developed and published by Anuj Digital Labs are the
          intellectual property of Anuj Digital Labs and are protected by
          applicable copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable
          license to use our applications and Services for their intended
          personal or business purposes, subject to these Terms.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works of,
          publicly display, or otherwise exploit any content from our Services
          without our express written permission.
        </p>
        <p>
          Any feedback, suggestions, or ideas you submit to us may be used by
          us to improve our Services without any obligation to compensate you.
        </p>
      </>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    content: (
      <>
        <p>
          Where our Services involve user accounts or user-generated data, you
          are responsible for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>
            Maintaining the confidentiality of your account credentials
          </li>
          <li>
            All activity that occurs under your account
          </li>
          <li>
            Ensuring that any information you provide to us is accurate and
            up to date
          </li>
          <li>
            Notifying us promptly of any unauthorized use of your account
          </li>
        </ul>
        <p className="mt-3">
          You are solely responsible for any content or data you store, input,
          or transmit through our Services. We are not liable for any loss or
          corruption of user data unless caused by our direct negligence.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links and Services",
    content: (
      <>
        <p>
          Our Services may contain links to or integrations with third-party
          websites, services, or content. These are provided for convenience
          only. We do not endorse, control, or take responsibility for the
          content, policies, or practices of any third-party services.
        </p>
        <p>
          Your use of any third-party service is subject to that service&apos;s
          own terms and privacy policies. We encourage you to review those
          documents before use.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>
          Our Services are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis, without warranties of any kind,
          either express or implied, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Implied warranties of merchantability or fitness for a particular purpose</li>
          <li>Warranties that the Services will be error-free or uninterrupted</li>
          <li>Warranties regarding the accuracy or completeness of any content</li>
        </ul>
        <p className="mt-3">
          We make no warranty that our Services will meet your specific
          requirements or that any errors or defects will be corrected within
          any specific timeframe.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Anuj Digital Labs
          shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Loss of data, profits, or business opportunities</li>
          <li>Business interruption</li>
          <li>Unauthorized access to or alteration of your data</li>
          <li>Any other damages arising out of your use or inability to use our Services</li>
        </ul>
        <p className="mt-3">
          In jurisdictions that do not allow the exclusion or limitation of
          certain damages, our liability will be limited to the maximum extent
          permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of India, without regard to its conflict of law provisions.
        </p>
        <p>
          Any disputes arising under or in connection with these Terms shall be
          subject to the exclusive jurisdiction of the courts of India.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Updates to These Terms",
    content: (
      <>
        <p>
          We reserve the right to update or modify these Terms at any time. When
          we do, we will update the &ldquo;Last Updated&rdquo; date at the top
          of this page. We may also provide additional notice for significant
          changes, such as a notice within the application.
        </p>
        <p>
          Your continued use of our Services after any changes to these Terms
          constitutes your acceptance of the updated Terms. If you do not agree
          to the revised Terms, you should discontinue use of the Service.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <>
        <p>
          If you have questions about these Terms, please contact us:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
          <p className="font-semibold text-slate-800 mb-1">Anuj Digital Labs</p>
          <p className="text-slate-600 text-sm">
            Email:{" "}
            <a
              href="mailto:anujvibedeveloper@gmail.com"
              className="text-blue-700 underline underline-offset-2"
            >
              anujvibedeveloper@gmail.com
            </a>
          </p>
          <p className="text-slate-600 text-sm mt-1">
            Website:{" "}
            <a
              href="https://anujdigitallabs.com"
              className="text-blue-700 underline underline-offset-2"
            >
              anujdigitallabs.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Terms of"
      highlight="Service"
      description="The terms and conditions governing your use of Anuj Digital Labs applications, websites, and digital services."
      breadcrumbLabel="Terms of Service"
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
      sections={sections}
      contactNote="For questions about these Terms of Service, acceptable use, or licensing, please contact us directly."
    />
  );
}
