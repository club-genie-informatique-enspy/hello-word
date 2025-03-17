"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Sombre
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// styles/rainbow-theme.ts
// Fichier de configuration des couleurs arc-en-ciel

export const rainbowColors = {
  red: 'rgb(255, 0, 0)',
  orange: 'rgb(255, 127, 0)',
  yellow: 'rgb(255, 255, 0)',
  green: 'rgb(0, 255, 0)',
  blue: 'rgb(0, 0, 255)',
  indigo: 'rgb(75, 0, 130)',
  violet: 'rgb(148, 0, 211)',
};

export const rainbowGradient = 'linear-gradient(to right, rgb(255, 0, 0), rgb(255, 127, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(148, 0, 211))';

// Fonction pour attribuer une couleur d'arc-en-ciel basée sur l'ID ou un autre facteur
export const getColorFromIndex = (index: number) => {
  const colors = Object.values(rainbowColors);
  return colors[index % colors.length];
};

// Fonction pour générer un dégradé d'arc-en-ciel pour les bordures
export const getRainbowBorderStyle = () => {
  return {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderImage: `${rainbowGradient} 1`,
  };
};

// Classe Tailwind pour les boutons arc-en-ciel (hover)
export const rainbowButtonHover = 'hover:bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 hover:text-white transition-colors duration-300';

// Styles pour les like buttons
export const rainbowLikeButton = (isLiked: boolean) => {
  if (isLiked) {
    return 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500';
  }
  return 'text-gray-500';
};

// tailwind.config.js additions - copier dans votre fichier de configuration Tailwind
/*
module.exports = {
  theme: {
    extend: {
      colors: {
        rainbow: {
          red: 'rgb(255, 0, 0)',
          orange: 'rgb(255, 127, 0)',
          yellow: 'rgb(255, 255, 0)',
          green: 'rgb(0, 255, 0)',
          blue: 'rgb(0, 0, 255)',
          indigo: 'rgb(75, 0, 130)',
          violet: 'rgb(148, 0, 211)',
        },
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(to right, rgb(255, 0, 0), rgb(255, 127, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(148, 0, 211))',
      },
    },
  },
  plugins: [],
};
*/