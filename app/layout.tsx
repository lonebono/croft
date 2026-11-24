// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (latin subset). Not next/font/google: its
// Turbopack loader fails on this machine, and local files keep builds offline.
const robotoSlab = localFont({
  src: "./fonts/RobotoSlab-latin.woff2",
  variable: "--font-roboto-slab",
  weight: "400 700",
  adjustFontFallback: "Times New Roman",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 500",
});

export const metadata: Metadata = {
  title: "Croft",
  description: "Personal admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
