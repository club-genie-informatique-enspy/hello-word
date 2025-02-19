// @/app/(main)/response/page.tsx
'use client'
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMessages } from '@/app/lib/article';
import toggleLike from '@/hooks/messages';
import { MessageCard } from '@/components/v2/messages/card/message-card';
import { Pagination } from '@/components/v2/messages/pagination/pagination';
import { AnimationStyles } from '@/components/v2/messages/animations/styles';
import { 
  FloatingBubble, 
  FloatingHeart 
} from '@/components/v2/messages/animations/floating-elements';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';



const MESSAGES_PER_PAGE = 6;

export default function ResponsePage() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Utilisez un ID différent pour les messages de la version 2
        const data = await getMessages('f68b84ac-733b-4e9a-9cc9-b8c4e0a88b9a',true);
        const token_ = localStorage.getItem('token')?.toString() || "";
        setMessages(data);
        setToken(token_);
        
        const likedMessages = JSON.parse(localStorage.getItem('likedMessages') || '[]');
        const initialLikes = data.reduce<{ [key: string]: boolean }>((acc, message) => ({
          ...acc,
          [message.message_uuid]: likedMessages.includes(message.message_uuid)
        }), {});
        setLikes(initialLikes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleHeartClick = async (messageUuid: string): Promise<void> => {
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      await toggleLike({ 
        token: token.replace(/^"|"$/g, ""), 
        uuid_message: messageUuid 
      });

      const likedMessages: string[] = JSON.parse(localStorage.getItem('likedMessages') || '[]');
      const isLiked = likedMessages.includes(messageUuid);

      if (isLiked) {
        const updatedLikedMessages = likedMessages.filter(uuid => uuid !== messageUuid);
        localStorage.setItem('likedMessages', JSON.stringify(updatedLikedMessages));
      } else {
        const updatedLikedMessages = [...likedMessages, messageUuid];
        localStorage.setItem('likedMessages', JSON.stringify(updatedLikedMessages));
      }

      setLikes(prev => ({
        ...prev,
        [messageUuid]: !prev[messageUuid]
      }));

      setMessages(prev => prev.map(msg => 
        msg.message_uuid === messageUuid 
          ? { ...msg, likes: msg.likes + (likes[messageUuid] ? -1 : 1) }
          : msg
      ));

    } catch (err) {
      setError('Erreur lors du basculement du like.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const displayedMessages = messages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);

  return (
    <div className="relative p-8 mt-16 bg-gradient-to-b from-white to-pink-50 
      border-2 border-gray-200 rounded-xl min-h-screen overflow-hidden">
      <AnimationStyles />
      {[...Array(15)].map((_, i) => (
        <FloatingBubble key={`bubble-${i}`} delay={i * 2} />
      ))}
      
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 3} />
      ))}
           <div className="w-full max-w-7xl mx-auto mb-8">
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 
      text-transparent bg-clip-text">
      Crush Anonymes
    </h1>
    <button
      onClick={() => router.push('/v2/messages')}
      className="inline-flex items-center text-gray-600 hover:text-pink-500 font-medium transition-colors"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Part 1
    </button>
  </div>
</div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedMessages.map((message, index) => (
            <div 
              key={message.message_uuid} 
              className={index % 2 === 1 ? 'flex justify-end' : 'flex justify-start'}
            >
              <MessageCard
                messageData={message}
                onHeartClick={() => handleHeartClick(message.message_uuid)}
                isLiked={likes[message.message_uuid]}
                isRight={index % 2 === 1}
                version="v2"
              />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}