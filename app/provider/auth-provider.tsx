"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { User ,DataToLogin} from "@/type"
import { fetchAPI } from "../lib/api"
import Cookies from 'js-cookie'

interface AuthContextType {
  user: User | null
  token: string|null
  successLoginMessage: string | null
  login: (data: DataToLogin) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  token: null,
  successLoginMessage: null
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [successLoginMessage, setsuccessLoginMessage] = useState<string | null>(null);
  

  useEffect(() => {
    const storedUser = Cookies.get("currentUser")
    const storedToken = Cookies.get("authToken")

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
  
      Cookies.set("currentUser", JSON.stringify(user));
      Cookies.set("authToken", token); 
      setUser(user);
      setsuccessLoginMessage("Connexion réussie !");
      setTimeout(() => setsuccessLoginMessage(null), 2000);
      
      router.push("/");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  
  const logout = () => {
    setUser(null)
    setToken(null)
    Cookies.remove("currentUser")
    Cookies.remove("AuthToken")
    router.push("/login")
    router.refresh()
  }

  return (
    <AuthContext.Provider value={{ user,token, login, logout ,successLoginMessage}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)