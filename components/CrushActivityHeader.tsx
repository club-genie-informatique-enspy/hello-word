import { useEffect, useState } from "react";
import { getAllActivities } from "@/app/lib/activity";
import { getAllMessages } from "@/app/lib/crush-messages";
import { Button } from "@/components/ui/button";
import { crushMessage, Activity } from "@/type";
import {CrushMessageCard} from "./crushMessageCard"
import Link from "next/link";



// Composant CrushActivityHeader
export default function CrushActivityHeader() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [topMessages, setTopMessages] = useState<crushMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const activities = await getAllActivities();
        if (activities.length > 0) {
          setActivity(activities[0]);

          const messages = await getAllMessages(activities[0].activity_uuid);
          const sortedMessages = messages.sort((a, b) => b.likes - a.likes).slice(0, 4);
          setTopMessages(sortedMessages);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Chargement...</p>;
  if (!activity) return <p className="text-center text-gray-600">Aucune activité trouvée.</p>;

  return (
    <section className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white w-max">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold">💘 Crush Anonymes 💘</h1>
        <p className="text-lg mt-4">{activity.description}</p>
        <Link href="/messages" className="mt-6 bg-white text-pink-600 p-4">
          Voir tous les messages
        </Link>
      </div>

      <div className="flex mt-10 gap-4 overflow-x-auto px-4 w-full max-w-screen-lg">
        {topMessages.length > 0 ? (
          topMessages.map((message) => (
            <CrushMessageCard key={message.message_uuid} message={message} />
          ))
        ) : (
          <p className="text-white">Aucun message pour le moment.</p>
        )}
      </div>
    </section>
  );
}
