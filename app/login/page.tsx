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

export default function LoginPage() {
  const router = useRouter()
  const { loginUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [status, setStatus] = useState<string | null>(null)
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
      setIsLoading(false)
      return
    }

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
        setErrors,
        setStatus,
      })
    } catch (error) {
      // L'erreur est déjà gérée dans loginUser
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md p-6">
          <div className="text-center">Connexion en cours...</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Entrez votre Email"
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
                placeholder="Entrez votre mot de passe"
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

            {status && (
              <div className="flex justify-center">
                <Badge variant="default" className="text-sm">
                  {status}
                </Badge>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              Se connecter
            </Button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Pas encore de compte ? </span>
              <Link href="/register" className="text-blue-600 hover:underline">
                Inscrivez-vous
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}