"use client"

import * as React from "react"
import Link from "next/link"
import Image from 'next/image';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import { Lock, LogOut, UserPlus, LogIn } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useAuth } from "@/app/provider/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/images/logo-dark-2.png" : "/images/logo-light-2.png";

  const handleLogout = () => {
    logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="px-4 py-3 w-full z-20 border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <div className="relative w-40 h-16">
            <Image
              alt="Logo"
              src={logoSrc}
              fill
              priority
              style={{
                objectFit: "contain",
                transform: "scale(1.5)", // Agrandit l'image
              }}
            />
          </div>
        </Link>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Bienvenue {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Lock className="mr-2 h-4 w-4" />
                  Compte
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/register" className="cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Inscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    Connexion
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}