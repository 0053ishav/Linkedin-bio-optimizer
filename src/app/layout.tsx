import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Bio Optimizer | Generate SEO-Friendly Profiles",
  description:
    "Create professional, keyword-rich LinkedIn profiles that stand out to recruiters and boost your visibility in search results.",
  keywords: [
    "LinkedIn bio",
    "LinkedIn profile generator",
    "SEO LinkedIn",
    "professional profile",
    "resume builder",
    "job search optimization",
    "LinkedIn optimization",
    "recruiter visibility"
  ],
  metadataBase: new URL("https://linkedin-bio.ishav.space"),
  openGraph: {
    title: "LinkedIn Bio Optimizer | Generate SEO-Friendly Profiles",
    description:
      "Create professional, keyword-rich LinkedIn profiles that stand out to recruiters and boost your visibility in search results.",
    url: "https://linkedin-bio.ishav.space",
    siteName: "LinkedIn Bio Optimizer",
    images: [
      {
        url: "/logo/linkedin-bio-optLogo.png", // Add your OG image here
        width: 1200,
        height: 630,
        alt: "LinkedIn Bio Optimizer - SEO Friendly LinkedIn Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Bio Optimizer | Generate SEO-Friendly Profiles",
    description:
      "Create keyword-rich LinkedIn profiles that attract recruiters and stand out in search.",
    images: ["/logo/linkedin-bio-optLogo.png"],
  },
  icons: {
    icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/logo/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/logo/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo/safari-pinned-tab.svg",
        color: "#0a66c2", // LinkedIn's brand blue
      },
    ],
  },
  manifest: "/logo/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
