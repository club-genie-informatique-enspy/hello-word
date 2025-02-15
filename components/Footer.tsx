import Link from "next/link"
import { Github, Facebook, Instagram, Twitter, Linkedin, WhatsApp } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/ClubGI-ENSPY", label: "GitHub" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://web.facebook.com/ClubGIND/", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/club_info_enspy/", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/club_info_enspy", label: "Twitter" },
    { icon: <WhatsApp className="w-5 h-5" />, href: "https://wa.me/237683862442", label: "WhatsApp" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://cm.linkedin.com/in/club-gi-enspy-1a919b29b", label: "LinkedIn" }
  ]

  const footerLinks = [
    {
      title: "À propos",
      links: [
        { label: "Notre histoire", href: "/about" },
        { label: "Notre équipe", href: "/team" },
        { label: "Nos valeurs", href: "/values" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Blog", href: "/blog" },
        { label: "Actualités", href: "/news" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Adhésion", href: "/join" }
      ]
    }
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Club GI ENSPY</h2>
            <p className="text-gray-600 text-sm max-w-xs">
              Promouvoir l'excellence et l'innovation dans le domaine du génie informatique
              au sein de l'ENSPY.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Club GI. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Conditions d'utilisation
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}