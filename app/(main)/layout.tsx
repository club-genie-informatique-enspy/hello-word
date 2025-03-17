'use client';

import React from "react";
import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";

export default function MainLayout({
   children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
