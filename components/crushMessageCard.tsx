
import { Heart } from "lucide-react";
import { crushMessage } from "@/type";

// Composant CrushMessageCard
export function CrushMessageCard({ message }: { message: crushMessage }) {
  return (
    <div className="bg-pink-100 p-4 rounded-xl shadow-md text-center min-w-[250px] max-w-[300px]">
      <p className="text-lg font-semibold">{message.contenu}</p>
      <div className="flex items-center justify-center mt-2">
        <Heart className="text-red-500" />
        <span className="ml-1">{message.likes}</span>
      </div>
    </div>
  );
}
