import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
            <div className="max-w-lg w-full bg-white rounded-xl overflow-hidden">
                <div className="relative h-auto w-full py-4 flex justify-center">
                    <div className="relative w-full h-64 md:h-80">
                        <Image
                            src="/images/not-found.png"
                            alt="Page non trouvée"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Page non trouvée</h2>

                    <p className="text-gray-600 mb-8">
                        Désolé, la page que vous recherchez semble avoir disparu.
                        Vous trouverez beaucoup à explorer sur notre page d'accueil.
                    </p>

                    <Link href="/" className="inline-block">
                        <Button className="bg-[#FF9100] hover:bg-[#e58200] text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                            <ArrowLeft size={18} />
                            Retour à l'accueil
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
