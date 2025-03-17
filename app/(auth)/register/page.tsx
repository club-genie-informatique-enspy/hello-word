"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/auth"
import Link from "next/link"
import { validateEmail } from "../../(main)/lib/utils"
import { UserData } from "@/type"
import Image from "next/image"
import { Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Toaster, toast } from "sonner"

export default function RegisterPage() {
    const router = useRouter()
    const { registerUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        // Validations locales
        const validationErrors: { [key: string]: string[] } = {}

        if (!validateEmail(formData.email)) {
            validationErrors.email = ["L'email n'est pas valide"]
            toast.error("L'email n'est pas valide", {
                description: "Veuillez entrer une adresse email valide",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            })
        }

        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = ["Les mots de passe ne correspondent pas"]
            toast.error("Les mots de passe ne correspondent pas", {
                description: "Veuillez vous assurer que les deux mots de passe sont identiques",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            })
        }

        if (!formData.name || !formData.email || !formData.password) {
            validationErrors.general = ["Tous les champs sont obligatoires"]
            toast.error("Formulaire incomplet", {
                description: "Veuillez remplir tous les champs requis",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            })
        }

        if (formData.password.length < 6) {
            validationErrors.password = ["Le mot de passe doit contenir au moins 6 caractères"]
            toast.error("Mot de passe trop court", {
                description: "Le mot de passe doit contenir au moins 6 caractères",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            })
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setIsLoading(false)
            return
        }

        try {
            const userData: UserData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "user"
            }

            await registerUser({
                ...userData,
                setErrors: (errors) => {
                    setErrors(errors)
                    if (errors.name) {
                        toast.error(errors.name[0])
                    }
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
            })

            // Message de succès
            toast.success("Inscription réussie", {
                description: "Votre compte a été créé avec succès",
                icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            })
            // Redirection vers la page de connexion
            router.push("/login")

        } catch (error) {
            toast.error("Erreur d'inscription", {
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
                            <h2 className="text-3xl font-bold mb-4">Rejoignez-nous</h2>
                            <p className="text-lg opacity-90 mb-6">
                                Créez votre compte pour accéder à du contenu exclusif et personnalisé
                            </p>
                            <div className="relative w-96 h-96 mx-auto">
                                <Image
                                    src="/images/register.png"
                                    alt="Illustration d'inscription"
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
                                Créer un compte
                            </CardTitle>
                            <p className="text-gray-500 text-sm">
                                Complétez le formulaire ci-dessous pour créer votre compte
                            </p>
                        </CardHeader>
                        <CardContent className="px-0">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700">Nom d'utilisateur</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Votre nom d'utilisateur"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`pl-10 ${errors.name ? 'border-red-500 ring-red-100' : ''}`}
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="flex items-center mt-1 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.name[0]}
                                        </div>
                                    )}
                                </div>

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
                                    <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
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

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirmer le mot de
                                        passe</Label>
                                    <div className="relative">
                                        <Lock
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value
                                            })}
                                            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 ring-red-100' : ''}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5"/>
                                            ) : (
                                                <Eye className="h-5 w-5"/>
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className="flex items-center mt-1 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4 mr-1"/>
                                            {errors.confirmPassword[0]}
                                        </div>
                                    )}
                                </div>

                                {errors.general && (
                                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm flex items-start">
                                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>{errors.general[0]}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#FF9100] hover:bg-orange-500 text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Inscription en cours..." : "Créer un compte"}
                                </Button>

                                <div className="text-center">
                                    <span className="text-gray-600">Vous avez déjà un compte? </span>
                                    <Link href="/login" className="text-[#FF9100] hover:text-orange-800 font-medium">
                                        Se connecter
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
