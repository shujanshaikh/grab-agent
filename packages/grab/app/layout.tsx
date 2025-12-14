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
  title: "Grab Agent | AI-Powered Code Modification",
  description:
    "Select any UI element in your browser, describe the change you want, and watch your local codebase update instantly. No copy-paste, no context switching.",
  keywords: ["AI", "code modification", "React", "Next.js", "Vite", "developer tools"],
  authors: [{ name: "Shujan Shaikh", url: "https://twitter.com/shujanshaikh" }],
  openGraph: {
    title: "Grab Agent | AI-Powered Code Modification",
    description:
      "Select any UI element in your browser, describe the change you want, and watch your local codebase update instantly.",
    type: "website",
    siteName: "Grab Agent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grab Agent | AI-Powered Code Modification",
    description:
      "Select any UI element in your browser, describe the change you want, and watch your local codebase update instantly.",
    creator: "@shujanshaikh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
