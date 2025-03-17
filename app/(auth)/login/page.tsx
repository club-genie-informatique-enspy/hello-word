"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/auth"
import Link from "next/link"
import { validateEmail } from "../../lib/utils"
import Image from "next/image"
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Toaster, toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const { loginUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
    const [status, setStatus] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        setStatus(null)

        // Validation de l'email
        if (!validateEmail(formData.email)) {
            setErrors({ email: ["L'email n'est pas valide"] })
            toast.error("L'email n'est pas valide", {
                description: "Veuillez entrer une adresse email valide",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            })
            setIsLoading(false)
            return
        }

        try {
            await loginUser({
                email: formData.email,
                password: formData.password,
                setErrors: (errors) => {
                    setErrors(errors)
                    // Afficher les erreurs avec toast
                    if (errors.email) {
                        toast.error(errors.email[0])
                    }
                    if (errors.password) {
                        toast.error(errors.password[0])
                    }
                    if (errors.message) {
                        toast.error(errors.message[0])
                    }
                },
                setStatus: (status) => {
                    setStatus(status)
                    if (status) {
                        toast.success("Connexion réussie", {
                            description: status,
                            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                        })
                    }
                },
            })
        } catch (error) {
            toast.error("Erreur de connexion", {
                description: "Une erreur est survenue. Veuillez réessayer plus tard.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container my-28 mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-150px)] flex items-center justify-center">
            <Card className="w-full max-w-5xl overflow-hidden shadow-lg border-0">
                <div className="flex flex-col md:flex-row">
                    {/* Section image à gauche */}
                    <div className="w-full md:w-1/2 bg-gray-50 relative h-64 md:h-auto flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
                        <div className="relative z-10 p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Bienvenue</h2>
                            <p className="text-lg opacity-90 mb-6">
                                Accédez à votre compte pour découvrir nos derniers articles et fonctionnalités
                            </p>
                            <div className="relative w-96 h-96 mx-auto">
                                <Image
                                    src="/images/login.png"
                                    alt="Illustration de connexion"
                                    fill
                                    className="object-contain rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section formulaire à droite */}
                    <div className="w-full my-auto md:w-1/2 bg-white p-6 md:p-10">
                        <CardHeader className="space-y-1 px-0 pt-0">
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Connexion à votre compte
                            </CardTitle>
                            <p className="text-gray-500 text-sm">
                                Entrez vos identifiants pour accéder à votre espace personnel
                            </p>
                        </CardHeader>
                        <CardContent className="px-0">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700">Adresse email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder="nom@exemple.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`pl-10 ${errors.email ? 'border-red-500 ring-red-100' : ''}`}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="flex items-center mt-1 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.email[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                                        <Link href="/forgot-password"
                                              className="text-sm text-[#FF9100] hover:text-orange-800">
                                            Mot de passe oublié?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            className={`pl-10 pr-10 ${errors.password ? 'border-red-500 ring-red-100' : ''}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5"/>
                                            ) : (
                                                <Eye className="h-5 w-5"/>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="flex items-center mt-1 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4 mr-1"/>
                                            {errors.password[0]}
                                        </div>
                                    )}
                                </div>

                                {errors.message && (
                                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm flex items-start">
                                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"/>
                                        <span>{errors.message[0]}</span>
                                    </div>
                                )}

                                {status && (
                                    <div
                                        className="bg-green-50 text-green-600 p-3 rounded-md text-sm flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2"/>
                                        <span>{status}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#FF9100] hover:bg-orange-500 text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-600">Pas encore de compte? </span>
                                    <Link href="/register" className="text-[#FF9100] hover:text-orange-800 font-medium">
                                        Créer un compte
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </div>
                </div>
            </Card>

            <Toaster position="top-right" richColors expand={false} />
        </div>
    )
}
