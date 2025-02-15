"use client"

import * as React from "react"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock, LogOut, UserPlus, LogIn, Shield, Menu, X } from "lucide-react"
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("")

  const handleLogout = () => {
    logout()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/v2/articles", label: "Articles" },
    { href: "/v2/about", label: "About" },
    { href: "/v2/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 w-full z-50 border-b border-gray-200 bg-white/95">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/v2" className="flex-shrink-0">
            <div className="relative w-32 h-12 md:w-40 md:h-16">
              <Image
                alt="Logo"
                src="/images/logo-light-2.png"
                fill
                priority
                className="object-contain transform scale-150"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2 py-1 text-gray-600 transition-colors duration-200
                  hover:text-blue-600 ${activeItem === item.href ? 'text-blue-600' : ''}
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:w-full after:h-0.5 after:bg-blue-600
                  after:transform after:scale-x-0 after:transition-transform after:duration-200
                  hover:after:scale-x-100 ${activeItem === item.href ? 'after:scale-x-100' : ''}`}
                onClick={() => setActiveItem(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 transition-colors duration-200 hover:text-blue-600"
                  >
                    <span>Bienvenue {user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer transition-colors duration-200 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 transition-colors duration-200 hover:text-blue-600"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Compte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/register"
                      className="flex items-center cursor-pointer transition-colors duration-200 hover:text-blue-600"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Inscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/login"
                      className="flex items-center cursor-pointer transition-colors duration-200 hover:text-blue-600"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Connexion
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin"
                      className="flex items-center cursor-pointer transition-colors duration-200 hover:text-blue-600"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="transition-colors duration-200 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 text-gray-600 transition-colors duration-200
                  hover:text-blue-600 hover:bg-blue-50 rounded-md py-2
                  ${activeItem === item.href ? 'text-blue-600 bg-blue-50' : ''}`}
                onClick={() => {
                  setActiveItem(item.href)
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-4">
                  <p className="px-2 text-sm text-gray-500">Bienvenue {user.name}</p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50 transition-colors duration-200"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full p-2 transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Inscription
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full p-2 transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Connexion
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full p-2 transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}