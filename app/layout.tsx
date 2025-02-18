'use client';

import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import SessionProviderWrapper from "@/components/v2/SessionProviderWrapper";
import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import Head from "next/head.js";

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

// export const metadata: Metadata = {
//   title: "Home | Hello World",
//   description: "Le journal du pipo par le pipo et pour le pipo.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>HELLO WORLD</title>
        <meta name="description" content="Le journal du pipo par le pipo et pour le pipo." />
        <meta property="og:image" content="https://hellow-word.vercel.app/images/logo-dark.png" />
        <meta property="og:url" content="https://hellow-word.vercel.app/#" />
        <meta property="og:type" content="website" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* <AuthProvider> */}
          <main className="flex-grow">
              <SessionProviderWrapper>
                <Navbar />
                {children}
                <Footer/>
                </SessionProviderWrapper>
          </main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}