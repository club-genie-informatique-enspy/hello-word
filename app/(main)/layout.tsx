'use client';

import React from "react";
import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import { EmailVerificationBanner } from "@/components/v2/EmailVerificationBanner";
import { useAuth } from "@/hooks/auth";

export default function MainLayout({
   children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    
    return (
        <>
            <Navbar />
            {/* Afficher la bannière de vérification d'email si l'utilisateur est connecté mais n'a pas vérifié son email */}
            {user && !user.email_verified_at && <EmailVerificationBanner />}
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}