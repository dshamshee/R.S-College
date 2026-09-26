import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/navHeader";
import { collegeDetails } from "@/config/collegeDetails";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://rdscollegesalmari.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${collegeDetails.name} | ${collegeDetails.city}, ${collegeDetails.district}`,
    template: `%s | ${collegeDetails.shortName} – ${collegeDetails.city}`,
  },
  description: `Official website of ${collegeDetails.name}, ${collegeDetails.city}. Affiliated to ${collegeDetails.university}. Offering undergraduate courses in Science, Arts & Commerce. Nurturing talent, inspiring innovation, and shaping future leaders.`,
  keywords: [
    collegeDetails.name,
    collegeDetails.shortName,
    "RDS College",
    "Ramdeo Sharda College Salmari",
    collegeDetails.university,
    "college in Katihar",
    "college in Bihar",
    "B.Sc Katihar",
    "B.A Katihar",
    "B.Com Katihar",
    "undergraduate college Bihar",
    "Purnea University affiliated college",
    "admission 2026",
  ],
  authors: [{ name: collegeDetails.name }],
  creator: collegeDetails.name,
  publisher: collegeDetails.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: collegeDetails.name,
    title: `${collegeDetails.name} – Official Website`,
    description: `Affiliated to ${collegeDetails.university}. Offering B.Sc, B.A & B.Com programs with modern infrastructure, experienced faculty, and holistic student development in ${collegeDetails.city}, ${collegeDetails.district}, ${collegeDetails.state}.`,
    images: [
      {
        url: "/images/Enterence-2.png",
        width: 1200,
        height: 630,
        alt: `${collegeDetails.name} Campus`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${collegeDetails.name} – Official Website`,
    description: `Affiliated to ${collegeDetails.university}. Offering B.Sc, B.A & B.Com programs in ${collegeDetails.city}, ${collegeDetails.district}.`,
    images: ["/images/Enterence-2.png"],
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
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data for the college (Organization + EducationalOrganization)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: collegeDetails.name,
  alternateName: collegeDetails.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/Enterence-2.png`,
  image: `${SITE_URL}/images/Enterence-2.png`,
  description: `Official website of ${collegeDetails.name}, affiliated to ${collegeDetails.university}. Offering undergraduate programs in Science, Arts & Commerce.`,
  address: {
    "@type": "PostalAddress",
    streetAddress: collegeDetails.address,
    addressLocality: collegeDetails.city,
    addressRegion: collegeDetails.state,
    postalCode: collegeDetails.pincode,
    addressCountry: "IN",
  },
  telephone: collegeDetails.phone,
  email: collegeDetails.email,
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: collegeDetails.university,
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          {/* JSON-LD Structured Data for search engines */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <NavHeader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        </body>
    </html>
  );
}
