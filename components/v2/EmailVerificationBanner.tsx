"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/auth"
import { AlertCircle, CheckCircle, Mail, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"

export function EmailVerificationBanner() {
    const { user, resendEmailVerification } = useAuth()
    const [isVisible, setIsVisible] = useState(true)
    const [isSending, setIsSending] = useState(false)

    // Si l'utilisateur n'est pas connecté ou que son email est déjà vérifié, ne pas afficher la bannière
    if (!user || user.email_verified_at) {
        return null
    }

    const handleResend = async () => {
        setIsSending(true)
        await resendEmailVerification({
            setStatus: (status) => {
                if (status === "success") {
                    toast.success("Email envoyé", {
                        description: "Un nouvel email de vérification a été envoyé à votre adresse email.",
                        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    })
                } else if (status === "error") {
                    toast.error("Erreur", {
                        description: "Impossible d'envoyer l'email de vérification. Veuillez réessayer.",
                        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                    })
                }
            }
        })
        setIsSending(false)
    }

    if (!isVisible) {
        return <Toaster position="top-right" richColors />
    }

    return (
        <>
            <div className="bg-orange-100 text-orange-800 px-4 py-3 fixed top-16 inset-x-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <p className="text-sm">
                            Veuillez vérifier votre adresse email pour accéder à toutes les fonctionnalités.
                            <Link href="/verify-email" className="ml-1 font-medium underline">
                                Plus d'informations
                            </Link>
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-orange-300 hover:bg-orange-200"
                            onClick={handleResend}
                            disabled={isSending}
                        >
                            {isSending ? "Envoi..." : "Renvoyer l'email"}
                        </Button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-orange-500 hover:text-orange-700"
                            aria-label="Fermer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </>
    )
}