"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { User ,DataToLogin} from "@/type"
import { fetchAPI } from "../lib/api"

interface AuthContextType {
  user: User | null
  token: string|null
  login: (data: DataToLogin) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  token: null
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    const storedToken = localStorage.getItem("authToken")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  // Liste des routes publiques
  const publicRoutes = ["/login", "/", "/register"]

  useEffect(() => {
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login")
    }
  }, [user, pathname, router])

  const login = async (data:DataToLogin) => {
    try {
      const response = await fetchAPI("/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
  
      const { user, token } = response; 
  
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("authToken", token); 
      setUser(user);
      
      router.push("/");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("AuthToken")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)