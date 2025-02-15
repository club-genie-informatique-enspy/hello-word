'use client'
import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMessages } from '@/app/lib/article';
import  toogleLike  from '@/hooks/messages';
import { useRouter } from 'next/navigation';

// Composant pour les bulles flottantes
const FloatingBubble = ({ delay }) => (
  <div 
    className="absolute w-4 h-4 rounded-full bg-blue-200/30"
    style={{
      animation: `float 15s infinite ${delay}s linear, sideWays 4s infinite ease-in-out`,
      left: `${Math.random() * 100}%`
    }}
  />
);

// Composant pour les cœurs flottants
const FloatingHeart = ({ delay }) => (
  <div 
    className="absolute text-red-300/30"
    style={{
      animation: `floatHeart 20s infinite ${delay}s linear`,
      left: `${Math.random() * 100}%`
    }}
  >
    <Heart size={24} fill="currentColor" />
  </div>
);

// Animation de like
const LikeAnimation = ({ top, left }) => (
  <div 
    className="absolute pointer-events-none"
    style={{ top, left }}
  >
    <div className="relative">
      {[...Array(6)].map((_, i) => (
        <Heart 
          key={i}
          size={16}
          className="absolute text-red-500 animate-float-away"
          style={{
            animation: `floatAway 1s forwards ${i * 0.1}s`,
            transform: `rotate(${i * 60}deg)`
          }}
        />
      ))}
    </div>
  </div>
);

const MessageCard = ({ message, onHeartClick, isLiked, likeCount, isRight }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });

  const handleHeartClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnimationPosition({
      top: e.clientY - rect.top,
      left: e.clientX - rect.left,
    });
    setShowAnimation(true);
    onHeartClick();
    setTimeout(() => setShowAnimation(false), 1000);
  };

  return (
    <div className={`relative p-4 bg-pink-50 rounded-lg border-2 border-red-300 w-64 shadow-md 
      hover:shadow-lg transition-shadow duration-300
      ${isRight ? 'ml-auto' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold">À «{message.receiver}»</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleHeartClick}
            className="focus:outline-none transform transition-transform hover:scale-110"
          >
            <Heart 
              className={`w-5 h-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
            />
          </button>
          <span className="text-sm text-gray-600">{message.likes}</span>
        </div>
      </div>
      
      <p className="text-sm mb-4">
        {message.contenu}
      </p>
      
      <p className="text-right italic text-sm">«{message.sender}»</p>
      
      {showAnimation && <LikeAnimation {...animationPosition} />}
    </div>
  );
};

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center gap-4 mt-8 mb-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:hover:bg-transparent"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    
    <div className="flex gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-8 h-8 rounded-full ${
            currentPage === index + 1
              ? 'bg-pink-500 text-white'
              : 'bg-pink-100 hover:bg-pink-200'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:hover:bg-transparent"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
);

const MESSAGES_PER_PAGE = 6; // 2 rangées de 3 messages

const LoveMessagesBoard = ({ activityUuid }: { activityUuid: string }) => {
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessages('f68b84ac-733b-4e9a-9cc9-b8c4e0a88b9a');
        const token_ = localStorage.getItem('token');
        console.log(data);
        setMessages(data);
        setToken(token_);
        const initialLikes = data.reduce((acc, message) => ({
          ...acc,
          [message.message_uuid]: false
        }), {});
        setLikes(initialLikes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [activityUuid]);

  const handleHeartClick = async (messageUuid: string) => {
    if(!token){
        router.push('/login');
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

    try {
      const result = await toogleLike({ token: token.replace(/^"|"$/g, "") , uuid_message: messageUuid });
      // setLiked(result.liked); 

      console.log('Like basculé avec succès :', result);
    } catch (err) {
      setError('Erreur lors du basculement du like.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Chargement des messages...</p>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const displayedMessages = messages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);
  
  // Organiser les messages en grille 3x2
  const gridLayout = [
    displayedMessages.slice(0, 3),
    displayedMessages.slice(3, 6)
  ];

  return (
    <div className="relative p-8 mt-12 bg-white border-2 border-gray-200 rounded-xl min-h-screen overflow-hidden">
      {/* Éléments décoratifs */}
      {[...Array(15)].map((_, i) => (
        <FloatingBubble key={`bubble-${i}`} delay={i * 2} />
      ))}
      
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 3} />
      ))}
      
      <div className="relative">
        <div className="flex flex-col gap-8">
          {gridLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-between gap-8">
              {row.map((message, index) => (
                <div key={message.message_uuid} className="flex-1 flex justify-center">
                  <MessageCard
                    message={message}
                    onHeartClick={() => handleHeartClick(message.message_uuid)}
                    isLiked={likes[message.message_uuid]}
                    isRight={index % 2 === 1}
                  />
                </div>
              ))}
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
};


// Styles d'animation globaux à ajouter en CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
  }
  
  @keyframes sideWays {
    0% { margin-left: 0; }
    50% { margin-left: 50px; }
    100% { margin-left: 0; }
  }
  
  @keyframes floatHeart {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes floatAway {
    0% { 
      transform: translate(0, 0) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% { 
      transform: translate(var(--tx, 50px), var(--ty, -50px)) rotate(var(--r, 90deg)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export default LoveMessagesBoard;