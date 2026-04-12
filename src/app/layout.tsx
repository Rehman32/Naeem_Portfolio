import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naeem Ur Rahman — Full-Stack & AI Engineer",
  description:
    "Portfolio of Naeem Ur Rahman, a Full-Stack Engineer and AI Developer specializing in scalable architectures and production AI systems.",
  metadataBase: new URL("https://naeemurrahman.dev"),
  openGraph: {
    title: "Naeem Ur Rahman — Full-Stack & AI Engineer",
    description:
      "Full-Stack Engineer and AI Developer specializing in scalable architectures and production AI systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naeem Ur Rahman — Full-Stack & AI Engineer",
    description:
      "Full-Stack Engineer and AI Developer specializing in scalable architectures and production AI systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#09090B" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}