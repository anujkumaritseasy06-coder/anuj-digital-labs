import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Anuj Digital Labs",
  description:
    "Read the Anuj Digital Labs Privacy Policy to understand how we handle information in our apps and services, our data security practices, and your rights.",
  openGraph: {
    title: "Privacy Policy | Anuj Digital Labs",
    description:
      "Our commitment to your privacy: how we collect, use, and protect information across our apps and services.",
    url: "https://anujdigitallabs.com/privacy-policy",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
};

const EFFECTIVE_DATE = "June 1, 2025";
const LAST_UPDATED = "June 26, 2026";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          Anuj Digital Labs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;) is committed to protecting the privacy of users of
          our applications, websites, and services (collectively,
          &ldquo;Services&rdquo;). This Privacy Policy describes how we handle
          information in connection with our Services.
        </p>
        <p>
          We build a range of digital products — including Android applications,
          web platforms, AI-powered tools, and business software. Each product
          may have its own specific data handling characteristics, and where
          relevant, those products will include their own in-app disclosures or
          supplementary notices.
        </p>
        <p>
          By using any of our Services, you agree to the practices described in
          this Privacy Policy. If you do not agree, please discontinue use of
          the Service.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We May Collect",
    content: (
      <>
        <p>
          The type of information collected varies by Service. In general, we
          may collect information in the following ways:
        </p>
        <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">
          Information You Provide Voluntarily
        </h3>
        <p>
          When you contact us, submit a support request, or fill out a form on
          our website, you may voluntarily provide us with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Your name and email address</li>
          <li>The content of your message or inquiry</li>
          <li>Any other information you choose to include</li>
        </ul>
        <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">
          Automatically Collected Information
        </h3>
        <p>
          Some of our Services may automatically collect certain technical
          information to help us improve product quality and diagnose issues.
          This may include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Device type, operating system version, and app version</li>
          <li>General usage patterns (e.g., feature interactions, crash reports)</li>
          <li>IP address and general geographic region (country or region level)</li>
        </ul>
        <p className="mt-3 text-sm bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800">
          <strong>Note:</strong> Individual applications published by Anuj
          Digital Labs may collect only a subset of the above. Each app&apos;s
          Google Play Store listing includes a Data Safety declaration specifying
          what that app collects and how it is used.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: (
      <>
        <p>Information we collect may be used to:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Respond to your inquiries, support requests, or feedback</li>
          <li>Operate, maintain, and improve our applications and services</li>
          <li>Diagnose technical problems and fix bugs</li>
          <li>Understand how features are used in order to improve user experience</li>
          <li>Ensure the security and integrity of our Services</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
        <p className="mt-3">
          We do not sell, rent, or trade your personal information to third
          parties for their marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          We take reasonable technical and organizational measures to help
          protect information against unauthorized access, disclosure,
          alteration, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Using HTTPS/TLS for data transmission where applicable</li>
          <li>Limiting access to personal data to those who need it</li>
          <li>Following secure development practices in our software</li>
          <li>Reviewing and updating our security practices over time</li>
        </ul>
        <p className="mt-3">
          However, no system is completely immune to security risks. We encourage
          users to take reasonable steps to protect their own information, such
          as using strong passwords and keeping their devices updated.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          Our applications may integrate third-party services and SDKs to
          provide certain functionality. These third parties operate under their
          own privacy policies. Commonly integrated services may include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>
            <strong>Google Play Services</strong> — used on Android devices for
            authentication, maps, and other platform features
          </li>
          <li>
            <strong>Firebase</strong> (by Google) — may be used for crash
            reporting, analytics, or push notifications in select apps
          </li>
          <li>
            <strong>AdMob</strong> (by Google) — may be used in free-tier apps
            to display ads; AdMob collects data as described in Google&apos;s
            privacy policy
          </li>
        </ul>
        <p className="mt-3">
          We recommend reviewing the privacy policies of any third-party services
          integrated into the specific app you are using. Links to relevant
          policies are typically provided in the app&apos;s Play Store listing.
        </p>
        <p>
          This website does not currently use tracking cookies or advertising
          networks.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as necessary to fulfill
          the purposes described in this policy, or as required by law. When
          information is no longer needed, we delete or anonymize it.
        </p>
        <p>
          Contact form submissions and support emails are retained for a
          reasonable period to allow us to follow up on your inquiry and improve
          our services, after which they may be deleted.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have the
          following rights regarding your personal information:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>
            <strong>Access:</strong> Request a copy of the personal information
            we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or
            incomplete information.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal
            information, subject to applicable legal requirements.
          </li>
          <li>
            <strong>Objection:</strong> Object to certain types of processing.
          </li>
          <li>
            <strong>Portability:</strong> Where technically feasible, request a
            portable copy of your data.
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:anujvibedeveloper@gmail.com"
            className="text-blue-700 underline underline-offset-2"
          >
            anujvibedeveloper@gmail.com
          </a>
          . For data deletion requests, please visit our{" "}
          <a href="/data-deletion" className="text-blue-700 underline underline-offset-2">
            Data Deletion Request
          </a>{" "}
          page.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Our Services are not directed at children under the age of 13, and we
          do not knowingly collect personal information from children. If you
          believe that a child has provided us with personal information, please
          contact us and we will take prompt steps to delete such information.
        </p>
        <p>
          Specific apps published by Anuj Digital Labs may have their own
          age-appropriateness ratings and disclosures in the Google Play Store.
        </p>
      </>
    ),
  },
  {
    id: "policy-updates",
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory reasons.
          When we make changes, we will update the &ldquo;Last Updated&rdquo; date
          at the top of this page.
        </p>
        <p>
          We encourage you to review this policy periodically. Continued use of
          our Services after any changes constitutes your acceptance of the
          updated policy.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests relating to this Privacy
          Policy or to your personal information, please contact us:
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

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Privacy"
      highlight="Policy"
      description="How Anuj Digital Labs handles information across our apps, websites, and services — written clearly and honestly."
      breadcrumbLabel="Privacy Policy"
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
      sections={sections}
      contactNote="For privacy-related questions, data access requests, or concerns about how your information is handled, please reach out to us directly."
    />
  );
}
