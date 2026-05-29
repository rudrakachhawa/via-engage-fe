import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ezzzDM",
  description: "Instagram automation platform",
  icons: {
    icon: [
      {
        url: "/appIcon.png",
        href: "/appIcon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}