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
import { validateEmail } from "../lib/utils"
import { UserData } from "@/type"

export default function RegisterPage() {
  const router = useRouter()
  const { registerUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
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
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = ["Les mots de passe ne correspondent pas"]
    }

    if (!formData.name || !formData.email || !formData.password) {
      validationErrors.general = ["Tous les champs sont obligatoires"]
    }

    if (formData.password.length < 6) {
      validationErrors.password = ["Le mot de passe doit contenir au moins 6 caractères"]
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
        setErrors,
      })
    } catch (error) {
      // Les erreurs sont gérées par le hook useAuth
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md p-6">
          <div className="text-center">Inscription en cours...</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Inscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom d'utilisateur</Label>
              <Input
                id="name"
                type="text"
                placeholder="Choisissez un nom d'utilisateur"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {errors.name && (
                <Badge variant="destructive" className="mt-1">
                  {errors.name[0]}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              {errors.email && (
                <Badge variant="destructive" className="mt-1">
                  {errors.email[0]}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Choisissez un mot de passe"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {errors.password && (
                <Badge variant="destructive" className="mt-1">
                  {errors.password[0]}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              {errors.confirmPassword && (
                <Badge variant="destructive" className="mt-1">
                  {errors.confirmPassword[0]}
                </Badge>
              )}
            </div>

            {errors.general && (
              <div className="flex justify-center">
                <Badge variant="destructive" className="text-sm">
                  {errors.general[0]}
                </Badge>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              S'inscrire
            </Button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Déjà un compte ? </span>
              <Link href="/login" className="text-blue-600 hover:underline">
                Connectez vous
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}