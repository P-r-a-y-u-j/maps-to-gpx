import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Map Link → GPX Converter | Free Route Export Tool",
  description: "Convert Google Maps and Apple Maps links to GPX files instantly. No login required. Free, fast, and privacy-friendly.",
  keywords: ["GPX converter", "map to GPX", "Google Maps GPX", "Apple Maps GPX", "route export"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
