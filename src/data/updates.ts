/**
 * updates.ts — Central data source for the "Latest Updates" page.
 *
 * HOW TO ADD A NEW UPDATE:
 * 1. Add a new entry at the TOP of the `updates` array (newest first).
 * 2. The page will automatically render it — no code changes needed.
 *
 * RULES:
 * - Keep entries factual and accurate.
 * - Use ISO 8601 date strings (YYYY-MM-DD).
 * - Categories: "announcement" | "release" | "maintenance" | "news"
 */

export type UpdateCategory = "announcement" | "release" | "maintenance" | "news";

export interface UpdateEntry {
  /** Unique identifier used as a React key */
  id: string;
  /** ISO 8601 date string, e.g. "2026-06-26" */
  date: string;
  /** One of the four allowed categories */
  category: UpdateCategory;
  /** Short headline */
  title: string;
  /** One to three sentence summary shown on the card */
  excerpt: string;
  /**
   * Optional: internal path to a full article page.
   * If omitted, the card will not render a "Read More" button.
   */
  slug?: string;
}

/**
 * Newest entries should be at the top of this array.
 */
export const updates: UpdateEntry[] = [
  {
    id: "website-launch-2026",
    date: "2026-06-26",
    category: "announcement",
    title: "Anuj Digital Labs Website is Live",
    excerpt:
      "Our official website is now live. You can learn about our services, explore our focus areas, and get in touch with us directly through the contact page.",
  },
  {
    id: "solutions-page-2026",
    date: "2026-06-26",
    category: "news",
    title: "Solutions Page Now Available",
    excerpt:
      "We've published a dedicated Solutions page detailing our service areas — including Android development, web platforms, AI-powered utilities, business productivity software, and digital automation tools.",
  },
  {
    id: "privacy-policy-2026",
    date: "2026-06-26",
    category: "announcement",
    title: "Privacy Policy and Terms of Service Published",
    excerpt:
      "Our Privacy Policy and Terms of Service are now published and accessible from the footer. These documents reflect our commitment to transparency and responsible data handling.",
  },
];
