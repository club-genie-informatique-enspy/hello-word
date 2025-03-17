'use client';

import localFont from "next/font/local";
import "./(main)/globals.css";
import SessionProviderWrapper from "@/components/v2/SessionProviderWrapper";
import Head from "next/head.js";
import React from "react";

const geistSans = localFont({
    src: "./(main)/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./(main)/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

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
        <SessionProviderWrapper>
            {children}
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
