"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/auth"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, CheckCircle, Mail } from "lucide-react"
import { Toaster, toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyEmailPage() {
    const router = useRouter()
    const { user, logout, resendEmailVerification } = useAuth({ middleware: 'auth' })
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    
    const handleResendVerification = async () => {
        setIsLoading(true)
        
        const success = await resendEmailVerification({
            setStatus: (newStatus) => {
                setStatus(newStatus)
                
                if (newStatus === 'success') {
                    toast.success("Email envoyé avec succès", {
                        description: "Veuillez vérifier votre boîte de réception",
                        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    })
                } else if (newStatus === 'error') {
                    toast.error("Erreur d'envoi", {
                        description: "Impossible d'envoyer l'email de vérification. Veuillez réessayer.",
                        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                    })
                }
            }
        })
        
        setIsLoading(false)
    }

    return (
        <div className="container my-28 mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-150px)] flex items-center justify-center">
            <Card className="w-full max-w-lg overflow-hidden shadow-lg border-0">
                <CardHeader className="text-center pb-2">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                            src="/android-chrome-512x512.png"
                            alt="Vérification d'email"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Vérifiez votre adresse email
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    <p className="text-center text-gray-600">
                        Merci de votre inscription ! Avant de commencer, pourriez-vous vérifier votre adresse 
                        email en cliquant sur le lien que nous venons de vous envoyer ?
                    </p>
                    
                    {user?.email && (
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                        </div>
                    )}
                    
                    {status === 'success' && (
                        <Alert className="bg-green-50 border-green-100">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <AlertDescription className="text-green-600">
                                Un nouveau lien de vérification a été envoyé à votre adresse email.
                            </AlertDescription>
                        </Alert>
                    )}
                    
                    <div className="space-y-3">
                        <p className="text-center text-sm text-gray-500">
                            Si vous n'avez pas reçu l'email, vérifiez votre dossier spam ou cliquez ci-dessous 
                            pour recevoir un nouvel email de vérification.
                        </p>
                        
                        <div className="flex justify-center">
                            <Button
                                onClick={handleResendVerification}
                                className="bg-[#FF9100] hover:bg-orange-500 text-white"
                                disabled={isLoading || status === 'loading'}
                            >
                                {isLoading || status === 'loading' ? (
                                    <>
                                        <span className="mr-2">Envoi en cours...</span>
                                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                                    </>
                                ) : (
                                    "Renvoyer l'email de vérification"
                                )}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="pt-4 text-center border-t border-gray-200">
                        <Button
                            variant="ghost"
                            onClick={() => logout()}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Toaster position="top-right" richColors expand={false} />
        </div>
    )
}