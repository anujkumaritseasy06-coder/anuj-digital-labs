/**
 * apps.ts — Central data source for the "Our Apps" page.
 *
 * HOW TO ADD A NEW APP:
 * 1. Copy the AppEntry interface shape below.
 * 2. Add your new entry to the `apps` array.
 * 3. The page will automatically render it — no code changes needed.
 *
 * RULES:
 * - Do not invent apps that do not exist.
 * - Use status "coming-soon" for apps in development.
 * - playStoreUrl is optional — only add when the app is live on the Play Store.
 * - learnMoreHref is optional — point to an internal detail page or external URL.
 */

export type AppPlatform = "Android" | "Web" | "Android & Web";
export type AppStatus = "available" | "coming-soon";
export type AppCategory =
  | "Productivity"
  | "Utilities"
  | "Business"
  | "AI Tools"
  | "Finance"
  | "Education"
  | "Health"
  | "Lifestyle"
  | "Other";

export interface AppEntry {
  /** Unique identifier used as a React key and for anchor links */
  id: string;
  /** Public-facing app name */
  name: string;
  /** One or two sentence description shown on the card */
  shortDescription: string;
  /** Category tag shown as a pill on the card */
  category: AppCategory;
  /** Platform(s) the app is available on */
  platform: AppPlatform;
  /** 3–5 bullet point features shown on the card */
  keyFeatures: string[];
  /** Whether the app is live or still in development */
  status: AppStatus;
  /** Optional: direct Google Play Store listing URL */
  playStoreUrl?: string;
  /** Optional: internal path (e.g. "/apps/my-app") or external URL for a Learn More button */
  learnMoreHref?: string;
}

/**
 * Add app entries to this array.
 * The page gracefully handles zero apps with an empty state.
 */
export const apps: AppEntry[] = [
  // No apps yet — add entries here when products are ready.
  // Example (uncomment and fill in):
  //
  // {
  //   id: "my-app",
  //   name: "My App",
  //   shortDescription: "A short description of what the app does.",
  //   category: "Productivity",
  //   platform: "Android",
  //   keyFeatures: [
  //     "Feature one",
  //     "Feature two",
  //     "Feature three",
  //   ],
  //   status: "coming-soon",
  //   playStoreUrl: "https://play.google.com/store/apps/details?id=...",
  //   learnMoreHref: "/apps/my-app",
  // },
];
