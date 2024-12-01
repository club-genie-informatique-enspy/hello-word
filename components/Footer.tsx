import Link from "next/link";
import { Github, Facebook, Instagram, Twitter, Linkedin, WhatsApp } from "@/components/icons"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function Footer() {

  return (

    <footer className="px-2 sm:px-4 py-2.5 w-full border-t border-border">
      <div className="container flex gap-4 flex-wrap items-center justify-around md:justify-between mx-auto">
        <div className="flex flex-row flex-wrap">
          <Link href={"https://github.com/ClubGI-ENSPY"}>
            <Button variant="link"> <Github /> </Button>
          </Link>
          <Link href={"https://web.facebook.com/ClubGIND/"}>
            <Button variant="link"> <Facebook /> </Button>
          </Link>
          <Link href={"https://www.instagram.com/club_info_enspy/"}>
            <Button variant="link"> <Instagram /> </Button>
          </Link>
          <Link href={"https://x.com/club_info_enspy"}>
            <Button variant="link"> <Twitter /> </Button>
          </Link>
          <Link href={"https://wa.me/237683862442"}>
          <Button variant="link"> < WhatsApp/> </Button>
          </Link>
          <Link href={"https://cm.linkedin.com/in/club-gi-enspy-1a919b29b"}>
            <Button variant="link"> <Linkedin /> </Button>
          </Link>
        </div>
        <Link href="https://github.com/frontendweb3" className="text-sm font-semibold whitespace-nowrap"> Copyright par clubGI </Link>
      </div>
    </footer>

  )
}
