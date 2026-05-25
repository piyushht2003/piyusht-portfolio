import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Piyush Singh Thakur | Frontend Engineer",
  description:
    "Frontend Engineer specialized in architecting immersive, responsive user interfaces using Next.js, TypeScript, and Framer Motion. Building premium digital experiences.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "Portfolio",
    "Piyush Singh Thakur",
  ],
  authors: [{ name: "Piyush Singh Thakur" }],
  openGraph: {
    title: "Piyush Singh Thakur | Frontend Engineer",
    description:
      "Frontend Engineer crafting immersive digital experiences with Next.js, TypeScript, and Framer Motion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Singh Thakur | Frontend Engineer",
    description:
      "Frontend Engineer crafting immersive digital experiences with Next.js, TypeScript, and Framer Motion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
