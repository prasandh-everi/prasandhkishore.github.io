/**
 * Portfolio data contract.
 *
 * These interfaces describe the shape of `portfolio.json`. They are the single
 * source of truth consumed across the app. Because the data is plain,
 * immutable, deserialized JSON with no behavior, we model it with `readonly`
 * interfaces (not classes) and keep all behavior in services.
 *
 * Optional media/link fields are genuinely optional — the UI must guard them.
 */

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------
export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly profileImage: string;
  readonly shortIntroduction: string;
  /** Long biography, split into paragraphs for readable rendering. */
  readonly longIntroduction: readonly string[];
  readonly location: string;
  readonly availability: string;
}

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------
export type SocialPlatform =
  'github' | 'leetcode' | 'linkedin' | 'email' | 'phone' | 'website' | 'other';

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly url: string;
  /** Icon key resolved by the shared icon component. */
  readonly icon: string;
}

// ---------------------------------------------------------------------------
// Documents (resume, certifications, ...)
// ---------------------------------------------------------------------------
export type DocumentType = 'resume' | 'certification' | 'case-study' | 'other';

export interface PortfolioDocument {
  readonly id: string;
  readonly type: DocumentType;
  readonly title: string;
  readonly description: string;
  /** Path/URL to the file (e.g. assets/documents/resume/resume.pdf). */
  readonly file: string;
  readonly viewable: boolean;
  readonly downloadable: boolean;
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  /** ISO date string (YYYY-MM or YYYY-MM-DD). */
  readonly startDate: string;
  /** ISO date string, or null for "Present". */
  readonly endDate: string | null;
  readonly location: string;
  readonly description: string;
  readonly responsibilities: readonly string[];
  readonly achievements: readonly string[];
  readonly technologies: readonly string[];
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly detailedDescription: string;
  readonly thumbnail?: string;
  readonly screenshots?: readonly string[];
  readonly architectureImage?: string;
  readonly technologies: readonly string[];
  readonly responsibilities: readonly string[];
  readonly challenges: readonly string[];
  readonly solutions: readonly string[];
  readonly outcomes: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  /** When true, external links/screenshots may be hidden. */
  readonly confidential: boolean;
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
export type SkillCategory =
  | 'Core languages'
  | 'Web engineering'
  | 'Distributed & real-time'
  | 'Architecture'
  | 'Platforms & tools';

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly items: readonly string[];
}

// ---------------------------------------------------------------------------
// SEO / meta
// ---------------------------------------------------------------------------
export interface PortfolioMeta {
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly canonicalUrl: string;
  readonly ogImage: string;
}

// ---------------------------------------------------------------------------
// Root aggregate — the single object the app consumes
// ---------------------------------------------------------------------------
export interface PortfolioData {
  readonly profile: Profile;
  readonly social: readonly SocialLink[];
  readonly documents: readonly PortfolioDocument[];
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
  readonly skills: readonly SkillGroup[];
  readonly meta: PortfolioMeta;
}
