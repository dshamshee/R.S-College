import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/navHeader";
import { collegeDetails } from "@/config/collegeDetails";
import { Analytics } from "@vercel/analytics/next";

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

export const metadata: Metadata = {
  title: `${collegeDetails.name} | ${collegeDetails.city}, ${collegeDetails.district}`,
  description: `Official website of ${collegeDetails.name}, ${collegeDetails.city}. Affiliated to ${collegeDetails.university}. Nurturing talent, inspiring innovation, and shaping future leaders.`,
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
        enableSystem
        disableTransitionOnChange
        >
          <NavHeader />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        </body>
    </html>
  );
}
