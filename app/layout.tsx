import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider"
import SessionProviderWrapper from "@/components/v2/SessionProviderWrapper";
import { Navbar } from "@/components/v2/layout/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Home | Open Blog",
  description: "The Open Blog is a open source template is design and built with Next.js 15, Shadcn UI and tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* <AuthProvider> */}
          <main className="flex-grow">
              <SessionProviderWrapper>
                <Navbar />
                {children}
                </SessionProviderWrapper>
          </main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}