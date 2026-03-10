import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const heading = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Buzzify Nigeria | Premium Social & Videography",
  description: "Social media management and cinematic iPhone videography in Abuja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}