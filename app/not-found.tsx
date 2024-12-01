import { Button } from "@/components/ui/button"
import { House } from "lucide-react"
import Link from "next/link"

export default function NotFound() {

  return (
    <section className="my-16">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl "> 404 </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl "> Quelque que chose ne va pas</p>
          <p className="mb-4 text-lg font-light ">
            Desole nous n'avons pas trouve cet article. Vous trouverz beaucoup a explorer dans la page d'accueil.
          </p>
          <Link href={"/"}>
            <Button variant="link"> <House /> Revenir a la page d'acceuil </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
