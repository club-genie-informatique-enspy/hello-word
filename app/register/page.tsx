// app/register/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../provider/auth-provider"
import { registerUser } from "../lib/auth"
import Link from "next/link"
import Error from "next/error"
import { validateEmail } from "../lib/utils"
import { UserData } from "@/type"



export default function RegisterPage() {
  const { login, user } = useAuth()
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      router.push("/")
      router.refresh()
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    // Validation de l'email
    if (!validateEmail(formData.email)) {
      setError("L'email n'est pas valide");
      setIsLoading(false);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    
    if (!formData.name || !formData.email || !formData.password) {
      setError("Tous les champs sont obligatoires.");
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setIsLoading(false);
      return;
    }
  
    try {
      
      const userData: UserData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user"
      };
      
      await registerUser(userData);
  
      // Rediriger vers la page de connexion
      await login({ email: formData.email, password: formData.password });
  
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || "Erreur lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };
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
            </div>

            {error && (
              <div className="flex justify-center">
                <Badge variant="destructive" className="text-sm">
                  {error}
                </Badge>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              S'inscrire
            </Button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Deja un compte ? </span>
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