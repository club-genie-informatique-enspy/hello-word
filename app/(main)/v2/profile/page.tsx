"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Toaster, toast } from "sonner"
import { LogOut, User, Mail, Calendar, Shield, ExternalLink } from "lucide-react"

export default function ProfilePage() {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    // Obtenir les initiales de l'utilisateur pour l'avatar
    const getUserInitials = () => {
        if (!user || !user.name) return "?"
        const nameParts = user.name.split(' ')
        if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
    }

    // Obtenir une couleur de fond basée sur le nom d'utilisateur
    const getAvatarBgColor = () => {
        if (!user || !user.name) return 'bg-gray-400'

        // Liste de couleurs pour les avatars
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500',
            'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500',
            'bg-red-500', 'bg-teal-500'
        ]

        // Utiliser la somme des codes de caractères du nom pour sélectionner une couleur
        const charSum = user?.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
        return colors[charSum % colors.length]
    }

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/')
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
            toast.error("Erreur lors de la déconnexion")
        }
    }

    const handleEditProfile = () => {
        toast.info("Fonctionnalité en cours de développement", {
            description: "La modification du profil sera bientôt disponible",
            duration: 3000
        })
    }

    // Si la page est en cours de chargement, affiche un indicateur de chargement
    if (isLoading) {
        return (
            <div className="container mx-auto py-28 px-4 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-[#FF9100] border-b-[#FF9100] border-r-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de votre profil...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-28 px-4 md:px-6 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold">Mon Profil</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                            {/* Colonne gauche avec avatar et actions */}
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <Avatar className={`w-32 h-32 ${getAvatarBgColor()} text-white text-4xl font-semibold`}>
                                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>

                                <h2 className="mt-5 text-2xl font-bold text-center">{user?.name}</h2>
                                <p className="mt-1 text-gray-500 text-center">{user?.email}</p>

                                <div className="w-full mt-6 flex flex-col gap-3">
                                    <Button
                                        className="w-full bg-[#FF9100] hover:bg-orange-600"
                                        onClick={handleEditProfile}
                                    >
                                        Modifier le profil
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </Button>
                                </div>
                            </div>

                            {/* Colonne droite avec informations */}
                            <div className="w-full md:w-2/3">
                                <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>

                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center text-gray-600 sm:w-1/3 mb-2 sm:mb-0">
                                            <User className="h-4 w-4 mr-2" />
                                            <span>Nom complet</span>
                                        </div>
                                        <div className="sm:w-2/3 font-medium">{user?.name || "Non défini"}</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center text-gray-600 sm:w-1/3 mb-2 sm:mb-0">
                                            <Mail className="h-4 w-4 mr-2" />
                                            <span>Email</span>
                                        </div>
                                        <div className="sm:w-2/3 font-medium">{user?.email || "Non défini"}</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center text-gray-600 sm:w-1/3 mb-2 sm:mb-0">
                                            <Shield className="h-4 w-4 mr-2" />
                                            <span>Rôle</span>
                                        </div>
                                        <div className="sm:w-2/3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                {user?.role === 'admin' ? 'admin' : 'user'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-medium mb-4">Actions supplémentaires</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex items-center justify-center"
                                            onClick={() => toast.info("Fonctionnalité en cours de développement")}
                                        >
                                            <Shield className="mr-2 h-4 w-4" />
                                            Sécurité du compte
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="flex items-center justify-center"
                                            onClick={() => router.push('/v2/articles')}
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Voir les articles
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Toaster
                position="top-right"
                richColors
                expand={false}
                closeButton={true}
                visibleToasts={3}
                theme="light"
            />
        </div>
    )
}







































/*
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Toaster, toast } from "sonner"
import { User, Mail, Lock, Bell, EyeOff, Eye, Shield, LogOut, Save, User2, Calendar, Phone } from "lucide-react"
import axios from "@/lib/axios"

export default function ProfilePage() {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("general")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    // Formulaire des informations générales
    const [generalForm, setGeneralForm] = useState({
        name: "",
        email: ""
    })

    // Formulaire de changement de mot de passe
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    })

    // Préférences de notifications
    const [notificationPreferences, setNotificationPreferences] = useState({
        email_notifications: true,
        newsletter: true,
        article_updates: true
    })

    // Charger les données utilisateur
    useEffect(() => {
        if (user) {
            setGeneralForm({
                name: user.name || "",
                email: user.email || ""
            })
        }
    }, [user])

    // Obtenir les initiales de l'utilisateur pour l'avatar
    const getUserInitials = () => {
        if (!user || !user.name) return "?"
        const nameParts = user.name.split(' ')
        if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
    }

    // Obtenir une couleur de fond basée sur le nom d'utilisateur
    const getAvatarBgColor = () => {
        if (!user || !user.name) return 'bg-gray-400'

        // Liste de couleurs pour les avatars
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500',
            'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500',
            'bg-red-500', 'bg-teal-500'
        ]

        // Utiliser la somme des codes de caractères du nom pour sélectionner une couleur
        const charSum = user.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
        return colors[charSum % colors.length]
    }

    const handleGeneralInfoChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setGeneralForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePasswordChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleNotificationChange = (key: string) => {
        setNotificationPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const validatePasswordForm = () => {
        const errors = {}
        if (!passwordForm.current_password) {
            errors.current_password = "Le mot de passe actuel est requis"
        }

        if (!passwordForm.new_password) {
            errors.new_password = "Le nouveau mot de passe est requis"
        } else if (passwordForm.new_password.length < 6) {
            errors.new_password = "Le mot de passe doit contenir au moins 6 caractères"
        }

        if (passwordForm.new_password !== passwordForm.confirm_password) {
            errors.confirm_password = "Les mots de passe ne correspondent pas"
        }

        return errors
    }

    const validateGeneralForm = () => {
        const errors = {}
        if (!generalForm.name.trim()) {
            errors.name = "Le nom est requis"
        }

        if (!generalForm.email.trim()) {
            errors.email = "L'email est requis"
        } else {
            // Validation basique d'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(generalForm.email)) {
                errors.email = "Format d'email invalide"
            }
        }

        return errors
    }

    const handleGeneralSubmit = async (e) => {
        e.preventDefault()

        // Valider le formulaire
        const errors = validateGeneralForm()
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)

            // Afficher les erreurs avec toast
            Object.values(errors).forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error)
                }, index * 300)
            })

            return
        }

        setIsSaving(true)
        setFormErrors({})

        try {
            toast.loading("Mise à jour du profil...", { id: "update-profile" })

            // Appel API pour mettre à jour le profil
            const response = await axios.post("/user/profile", generalForm)

            // Fermer le toast de chargement et afficher un succès
            toast.dismiss("update-profile")
            toast.success("Profil mis à jour avec succès")

            // Mettre à jour les données utilisateur dans le contexte d'authentification
            // Si votre hook useAuth a une fonction pour ça, utilisez-la ici

        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil:", error)

            toast.dismiss("update-profile")
            toast.error("Erreur lors de la mise à jour du profil")

            // Gestion des erreurs de validation
            if (error.response?.data?.errors) {
                setFormErrors(error.response.data.errors)

                // Afficher les erreurs avec toast
                Object.values(error.response.data.errors).forEach((errorMsg, index) => {
                    setTimeout(() => {
                        toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg)
                    }, index * 300)
                })
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()

        // Valider le formulaire
        const errors = validatePasswordForm()
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)

            // Afficher les erreurs avec toast
            Object.values(errors).forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error)
                }, index * 300)
            })

            return
        }

        setIsSaving(true)
        setFormErrors({})

        try {
            toast.loading("Modification du mot de passe...", { id: "update-password" })

            // Appel API pour changer le mot de passe
            const response = await axios.post("/user/change-password", {
                current_password: passwordForm.current_password,
                password: passwordForm.new_password,
                password_confirmation: passwordForm.confirm_password
            })

            // Réinitialiser le formulaire
            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: ""
            })

            // Fermer le toast de chargement et afficher un succès
            toast.dismiss("update-password")
            toast.success("Mot de passe modifié avec succès")

        } catch (error) {
            console.error("Erreur lors du changement de mot de passe:", error)

            toast.dismiss("update-password")
            toast.error("Erreur lors du changement de mot de passe")

            // Gestion des erreurs de validation
            if (error.response?.data?.errors) {
                setFormErrors(error.response.data.errors)

                // Afficher les erreurs avec toast
                Object.values(error.response.data.errors).forEach((errorMsg, index) => {
                    setTimeout(() => {
                        toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg)
                    }, index * 300)
                })
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleNotificationSubmit = async (e) => {
        e.preventDefault()

        setIsSaving(true)

        try {
            toast.loading("Enregistrement des préférences...", { id: "update-notifications" })

            // Appel API pour mettre à jour les préférences
            const response = await axios.post("/user/notifications", notificationPreferences)

            // Fermer le toast de chargement et afficher un succès
            toast.dismiss("update-notifications")
            toast.success("Préférences de notification mises à jour")

        } catch (error) {
            console.error("Erreur lors de la mise à jour des préférences:", error)

            toast.dismiss("update-notifications")
            toast.error("Erreur lors de l'enregistrement des préférences")
        } finally {
            setIsSaving(false)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/')
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
            toast.error("Erreur lors de la déconnexion")
        }
    }

    // Si la page est en cours de chargement, affiche un indicateur de chargement
    if (isLoading) {
        return (
            <div className="container mx-auto py-28 px-4 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-[#FF9100] border-b-[#FF9100] border-r-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de votre profil...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-28 px-4 md:px-6 lg:px-8 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/!* Sidebar avec informations utilisateur *!/}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                    {/!* Avatar généré à partir des initiales *!/}
                                    <div className="mb-4">
                                        <Avatar className={`w-24 h-24 ${getAvatarBgColor()} text-white text-2xl font-semibold`}>
                                            <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <h3 className="text-xl font-semibold mb-1">{user?.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

                                    <Button
                                        variant="destructive"
                                        className="w-full mt-2 bg-red-500 hover:bg-red-600"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/!* Navigation entre les onglets sur mobile *!/}
                        <div className="mt-4 block md:hidden">
                            <Card>
                                <CardContent className="p-0">
                                    <div className="flex flex-col divide-y">
                                        <button
                                            onClick={() => setActiveTab("general")}
                                            className={`p-4 text-left flex items-center ${activeTab === "general" ? "text-[#FF9100] font-medium" : "text-gray-700"}`}
                                        >
                                            <User2 className="mr-3 h-5 w-5" />
                                            Informations générales
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("security")}
                                            className={`p-4 text-left flex items-center ${activeTab === "security" ? "text-[#FF9100] font-medium" : "text-gray-700"}`}
                                        >
                                            <Shield className="mr-3 h-5 w-5" />
                                            Mot de passe
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("notifications")}
                                            className={`p-4 text-left flex items-center ${activeTab === "notifications" ? "text-[#FF9100] font-medium" : "text-gray-700"}`}
                                        >
                                            <Bell className="mr-3 h-5 w-5" />
                                            Notifications
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/!* Contenu principal *!/}
                    <div className="flex-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mon profil</CardTitle>
                                <CardDescription>
                                    Gérez vos informations personnelles et vos préférences
                                </CardDescription>
                            </CardHeader>

                            <Tabs
                                defaultValue="general"
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <div className="px-6 hidden md:block">
                                    <TabsList className="grid md:grid-cols-3 w-full">
                                        <TabsTrigger value="general" className="flex items-center">
                                            <User2 className="mr-2 h-4 w-4" />
                                            Informations
                                        </TabsTrigger>
                                        <TabsTrigger value="security" className="flex items-center">
                                            <Shield className="mr-2 h-4 w-4" />
                                            Mot de passe
                                        </TabsTrigger>
                                        <TabsTrigger value="notifications" className="flex items-center">
                                            <Bell className="mr-2 h-4 w-4" />
                                            Notifications
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <CardContent className="px-6 py-4">
                                    <TabsContent value="general">
                                        <form onSubmit={handleGeneralSubmit}>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-gray-700">Nom complet</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            value={generalForm.name}
                                                            onChange={handleGeneralInfoChange}
                                                            placeholder="Votre nom complet"
                                                            className={`pl-10 ${formErrors.name ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                    </div>
                                                    {formErrors.name && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gray-700">Adresse email</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={generalForm.email}
                                                            onChange={handleGeneralInfoChange}
                                                            placeholder="votre@email.com"
                                                            className={`pl-10 ${formErrors.email ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                    </div>
                                                    {formErrors.email && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-gray-700">Numéro de téléphone</Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            value={generalForm.phone}
                                                            onChange={handleGeneralInfoChange}
                                                            placeholder="Votre numéro de téléphone"
                                                            className={`pl-10 ${formErrors.phone ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                    </div>
                                                    {formErrors.phone && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="bio" className="text-gray-700">Biographie</Label>
                                                    <textarea
                                                        id="bio"
                                                        name="bio"
                                                        value={generalForm.bio}
                                                        onChange={handleGeneralInfoChange}
                                                        placeholder="Parlez-nous de vous"
                                                        rows={4}
                                                        className={`w-full px-3 py-2 border rounded-md ${formErrors.bio ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-transparent`}
                                                    />
                                                    {formErrors.bio && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.bio}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    type="submit"
                                                    className="bg-[#FF9100] hover:bg-orange-600"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <span className="mr-2">Enregistrement...</span>
                                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="mr-2 h-4 w-4" />
                                                            Enregistrer les modifications
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </TabsContent>

                                    <TabsContent value="security">
                                        <form onSubmit={handlePasswordSubmit}>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="current_password" className="text-gray-700">Mot de passe actuel</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="current_password"
                                                            name="current_password"
                                                            type={showCurrentPassword ? "text" : "password"}
                                                            value={passwordForm.current_password}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Votre mot de passe actuel"
                                                            className={`pl-10 pr-10 ${formErrors.current_password ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        >
                                                            {showCurrentPassword ? (
                                                                <EyeOff className="h-5 w-5"/>
                                                            ) : (
                                                                <Eye className="h-5 w-5"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                    {formErrors.current_password && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.current_password}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="new_password" className="text-gray-700">Nouveau mot de passe</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="new_password"
                                                            name="new_password"
                                                            type={showNewPassword ? "text" : "password"}
                                                            value={passwordForm.new_password}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Votre nouveau mot de passe"
                                                            className={`pl-10 pr-10 ${formErrors.new_password ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        >
                                                            {showNewPassword ? (
                                                                <EyeOff className="h-5 w-5"/>
                                                            ) : (
                                                                <Eye className="h-5 w-5"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                    {formErrors.new_password && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.new_password}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirm_password" className="text-gray-700">Confirmer le mot de passe</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                        <Input
                                                            id="confirm_password"
                                                            name="confirm_password"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={passwordForm.confirm_password}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Confirmer votre nouveau mot de passe"
                                                            className={`pl-10 pr-10 ${formErrors.confirm_password ? 'border-red-500 ring-red-100' : ''}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-5 w-5"/>
                                                            ) : (
                                                                <Eye className="h-5 w-5"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                    {formErrors.confirm_password && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors.confirm_password}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    type="submit"
                                                    className="bg-[#FF9100] hover:bg-orange-600"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <span className="mr-2">Modification en cours...</span>
                                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="mr-2 h-4 w-4" />
                                                            Modifier le mot de passe
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </TabsContent>

                                    <TabsContent value="notifications">
                                        <form onSubmit={handleNotificationSubmit}>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="email_notifications" className="text-gray-700">Notifications par email</Label>
                                                        <p className="text-gray-500 text-sm">Recevoir des notifications par email</p>
                                                    </div>
                                                    <Switch
                                                        id="email_notifications"
                                                        checked={notificationPreferences.email_notifications}
                                                        onCheckedChange={() => handleNotificationChange('email_notifications')}
                                                    />
                                                </div>

                                                <Separator />

                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="newsletter" className="text-gray-700">Newsletter</Label>
                                                        <p className="text-gray-500 text-sm">Recevoir notre newsletter mensuelle</p>
                                                    </div>
                                                    <Switch
                                                        id="newsletter"
                                                        checked={notificationPreferences.newsletter}
                                                        onCheckedChange={() => handleNotificationChange('newsletter')}
                                                    />
                                                </div>

                                                <Separator />

                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="article_updates" className="text-gray-700">Mises à jour d'articles</Label>
                                                        <p className="text-gray-500 text-sm">Être notifié des nouveaux articles</p>
                                                    </div>
                                                    <Switch
                                                        id="article_updates"
                                                        checked={notificationPreferences.article_updates}
                                                        onCheckedChange={() => handleNotificationChange('article_updates')}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    type="submit"
                                                    className="bg-[#FF9100] hover:bg-orange-600"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <span className="mr-2">Enregistrement...</span>
                                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="mr-2 h-4 w-4" />
                                                            Enregistrer les préférences
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </TabsContent>
                                </CardContent>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-right"
                richColors
                expand={false}
                closeButton={true}
                visibleToasts={3}
                theme="light"
            />
        </div>
    )
}
*/
