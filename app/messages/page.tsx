'use client'
import { useEffect, useState } from "react";
import { getAllActivities } from "@/app/lib/activity";
import { getAllMessages } from "../lib/crush-messages";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { CrushMessageCard } from "@/components/crushMessageCard";
import { Activity ,crushMessage} from "@/type";

// Composant CrushMessageCard

// Composant CrushActivityHeader
export default function CrushActivityHeader() {
const [activity, setActivity] = useState<Activity | null>(null);
  const [topMessages, setTopMessages] = useState<crushMessage[]>([]);

  useEffect(() => {
    async function fetchData() {
      const activities: Activity[] = await getAllActivities();
      if (activities.length > 0) {
        setActivity(activities[0]);
        const messages = await getAllMessages(activities[0].activity_uuid);
        const sortedMessages = messages.sort((a, b) => b.likes - a.likes).slice(0, 4);
        setTopMessages(sortedMessages);
      }
    }
    fetchData();
  }, []);

  if (!activity) return <p>Chargement...</p>;

  return (
    <section className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold">Crush Anonymes</h1>
        <p className="text-lg mt-4">{activity.description}</p>
        <Button size="lg" className="mt-6 bg-white text-pink-600">
          Voir tous les messages
        </Button>
      </div>
      <div className="flex mt-10 gap-4 overflow-x-auto">
        {topMessages.map((message: crushMessage) => (
          <CrushMessageCard key={message.message_uuid} message={message} />
        ))}
      </div>
    </section>
  );
}
