import type { MetadataRoute } from "next";

const SITE_URL = "https://rdscollegesalmari.ac.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages with their SEO priorities
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // About
    {
      url: `${SITE_URL}/about/college`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about/principal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Academics
    {
      url: `${SITE_URL}/academics/courses`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/academics/departments`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/academics/faculties`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/academics/admissions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/academics/research`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Infrastructure
    {
      url: `${SITE_URL}/infrastructure/library`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/infrastructure/laboratories`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/infrastructure/computer-lab`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/infrastructure/auditorium`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/infrastructure/conference`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/infrastructure/sports`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/infrastructure/health`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Gallery
    {
      url: `${SITE_URL}/gallery/photo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery/video`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // Student Zone
    {
      url: `${SITE_URL}/student/holidays`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/student/time-table`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/student/syllabus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/student/results`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Contact
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  return staticPages;
}
