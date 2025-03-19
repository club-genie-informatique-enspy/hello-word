"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import axios from "@/lib/axios"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Toaster, toast } from "sonner"

export default function VerifyEmailHandler() {
    const router = useRouter()
    const params = useParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState<string>("")
    
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Récupérer l'ID et le hash depuis les paramètres de l'URL
                const id = params.id
                const hash = params.hash
                
                // Effectuer la requête pour vérifier l'email
                const response = await axios.get(`/email/verify/${id}/${hash}`)
                
                setStatus('success')
                setMessage(response.data.message || "Votre adresse email a été vérifiée avec succès.")
                
                // Redirection automatique après 3 secondes
                setTimeout(() => {
                    router.push('/')
                }, 3000)
                
            } catch (error: any) {
                setStatus('error')
                setMessage(
                    error.response?.data?.message || 
                    "Une erreur est survenue lors de la vérification de votre email. Veuillez réessayer."
                )
                
                // Afficher une notification d'erreur
                toast.error("Échec de la vérification", {
                    description: message,
                    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                })
            }
        }
        
        verifyEmail()
    }, [params, router, message])
    
    return (
        <div className="container my-28 mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-150px)] flex items-center justify-center">
            <Card className="w-full max-w-lg overflow-hidden shadow-lg border-0">
                <CardHeader className="text-center pb-2">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        {status === 'loading' ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-16 w-16 text-[#FF9100] animate-spin" />
                            </div>
                        ) : status === 'success' ? (
                            <Image
                                src="/images/email-verified.png"
                                alt="Email vérifié"
                                fill
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <Image
                                src="/images/email-error.png"
                                alt="Erreur de vérification"
                                fill
                                className="object-contain"
                                priority
                            />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        {status === 'loading' 
                            ? "Vérification en cours..." 
                            : status === 'success' 
                                ? "Email vérifié !" 
                                : "Échec de la vérification"}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    {status === 'loading' ? (
                        <p className="text-center text-gray-600">
                            Nous procédons à la vérification de votre adresse email. Veuillez patienter...
                        </p>
                    ) : (
                        <>
                            <p className="text-center text-gray-600">
                                {message}
                            </p>
                            
                            {status === 'success' && (
                                <div className="text-center text-sm text-gray-500">
                                    <p>Vous allez être redirigé vers la page d'accueil dans quelques secondes.</p>
                                    <div className="mt-2 flex justify-center">
                                        <CheckCircle className="h-10 w-10 text-green-500 animate-pulse" />
                                    </div>
                                </div>
                            )}
                            
                            <div className="pt-4 flex justify-center">
                                <Button
                                    onClick={() => router.push('/')}
                                    className="bg-[#FF9100] hover:bg-orange-500 text-white"
                                >
                                    Aller à la page d'accueil
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <Toaster position="top-right" richColors expand={false} />
        </div>
    )
}