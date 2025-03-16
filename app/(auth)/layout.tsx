import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Authentification',
    description: 'Pages d\'authentification'
}

export default function AuthLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="bg-gray-50">
            {children}
        </body>
        </html>
    )
}
