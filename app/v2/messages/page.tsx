'use client'
import React, { useState, useEffect } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMessages } from '@/app/lib/article';
import toogleLike from '@/hooks/messages';
import { useRouter } from 'next/navigation';

// Types et interfaces


interface MessageModalProps {
  messageData: MessageData | null;
  isOpen: boolean;
  onClose: () => void;
  isLiked: boolean;
  onHeartClick: () => void;
}

interface MessageCardProps {
  messageData: MessageData;
  onHeartClick: () => void;
  isLiked: boolean;
  isRight: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface FloatingBubbleProps {
  delay: number;
}

interface FloatingHeartProps {
  delay: number;
}

interface LikeAnimationProps {
  top: number;
  left: number;
}


// Styles intégrés pour les animations
const AnimationStyles: React.FC = () => (
  <style jsx global>{`
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
    
    .animate-float-away:nth-child(1) { --tx: 60px; --ty: -40px; --r: 45deg; }
    .animate-float-away:nth-child(2) { --tx: 40px; --ty: -60px; --r: 90deg; }
    .animate-float-away:nth-child(3) { --tx: 10px; --ty: -70px; --r: 135deg; }
    .animate-float-away:nth-child(4) { --tx: -20px; --ty: -60px; --r: 180deg; }
    .animate-float-away:nth-child(5) { --tx: -40px; --ty: -40px; --r: 225deg; }
    .animate-float-away:nth-child(6) { --tx: -50px; --ty: -10px; --r: 270deg; }
  `}</style>
);


// Animation de like
const LikeAnimation: React.FC<LikeAnimationProps> = ({ top, left }) => (
  <div 
    className="absolute pointer-events-none"
    style={{ top, left }}
  >
    <div className="relative">
      {[...Array(6)].map((_, i) => (
        <Heart 
          key={i}
          size={16}
          className="absolute left-52 text-red-500 animate-float-away"
          style={{
            animation: `floatAway 1s forwards ${i * 0.1}s`,
            transform: `rotate(${i * 60}deg)`
          }}
        />
      ))}
    </div>
  </div>
);


// Composant pour les bulles flottantes
const FloatingBubble: React.FC<FloatingBubbleProps> = ({ delay }) => (
  <div 
    className="absolute w-4 h-4 rounded-full bg-blue-200/30"
    style={{
      animation: `float 15s infinite ${delay}s linear, sideWays 4s infinite ease-in-out`,
      left: `${Math.random() * 100}%`
    }}
  />
);

// Composant pour les cœurs flottants
const FloatingHeart: React.FC<FloatingHeartProps> = ({ delay }) => (
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


// [Les composants AnimationStyles, FloatingBubble, FloatingHeart, et LikeAnimation restent identiques]

const MessageModal: React.FC<MessageModalProps> = ({ messageData, isOpen, onClose, isLiked, onHeartClick }) => {

  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [animationPosition, setAnimationPosition] = useState<AnimationPosition>({ top: 0, left: 0 });
  
  if (!isOpen || !messageData) return null;
  
  const { sender, contenu, receiver, likes } = messageData;

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white border-2 border-red-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl text-red-400 font-semibold">À «{receiver}»</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="mb-4">{contenu}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-right italic text-sm">«{sender}»</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleHeartClick}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
                />
              </button>
              <span className="text-gray-600">{likes}</span>
            </div>
          </div>
          
          {showAnimation && <LikeAnimation {...animationPosition} />}
        </div>
      </div>
    </div>
  );
};

const MessageCard: React.FC<MessageCardProps> = ({ messageData, onHeartClick, isLiked, isRight }) => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [animationPosition, setAnimationPosition] = useState<AnimationPosition>({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const { sender, contenu, receiver, likes } = messageData;
  
  const truncatedContent = contenu.length > 100 
    ? `${contenu.substring(0, 100)}...`
    : contenu;

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
    <>
      <div 
        className={`relative p-4 bg-pink-50 rounded-lg border-2 border-red-300 w-full max-w-64 shadow-md 
          hover:shadow-lg transition-all duration-300 cursor-pointer
          ${isRight ? 'ml-auto' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="font-semibold text-sm">À «{receiver}»</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleHeartClick}
              className="focus:outline-none transform transition-transform hover:scale-110"
            >
              <Heart 
                className={`w-5 h-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
              />
            </button>
            <span className="text-sm text-gray-600">{likes}</span>
          </div>
        </div>
        
        <p className="text-sm mb-4">{truncatedContent}</p>
        <p className="text-right italic text-sm">«{sender}»</p>
        
        {showAnimation && <LikeAnimation {...animationPosition} />}
      </div>

      <MessageModal
        messageData={messageData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLiked={isLiked}
        onHeartClick={onHeartClick}
      />
    </>
  );
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6 mb-4">
      {/* Bouton Précédent */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Numéros de page */}
      <div className="flex gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="w-6 text-center">...</span>
          ) : (
            <button
/**
 * LoveMessagesBoard is a React functional component that fetches and displays a paginated 
 * list of love messages. It manages user interactions such as liking messages. The component 
 * handles loading states, error states, and pagination. It uses the `useRouter` hook to 
 * redirect unauthenticated users to the login page. The component also integrates animation 
 * effects for floating bubbles and hearts.
 */

              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-6 h-6 text-sm rounded-full transition ${
                currentPage === page
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 hover:bg-pink-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Bouton Suivant */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const MESSAGES_PER_PAGE = 6;

/*************  ✨ Codeium Command ⭐  *************/
/******  475bc94f-3db9-4d44-8c5a-6afea83c5464  *******/
const LoveMessagesBoard: React.FC = () => {
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
          const data = await getMessages('f68b84ac-733b-4e9a-9cc9-b8c4e0a88b9a');
          const token_ : string = localStorage.getItem('token')?.toString() || "";
          setMessages(data);
          setToken(token_);
          const likedMessages = JSON.parse(localStorage.getItem('likedMessages') || '[]');
          const initialLikes = data.reduce((acc, message) => ({
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

  const handleHeartClick = async (messageUuid: string) => {
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      const result = await toogleLike({ 
        token: token.replace(/^"|"$/g, ""), 
        uuid_message: messageUuid 
      });

      const likedMessages = JSON.parse(localStorage.getItem('likedMessages') || '[]');
      const isLiked = likedMessages.includes(messageUuid);

      if (isLiked) {
        const updatedLikedMessages = likedMessages.filter((uuid: string) => uuid !== messageUuid);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement des messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const displayedMessages = messages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);

  return (
    <div className="relative p-8 mt-16 bg-white border-2 border-gray-200 rounded-xl min-h-screen overflow-hidden">
      <AnimationStyles />
      
      {[...Array(15)].map((_, i) => (
        <FloatingBubble key={`bubble-${i}`} delay={i * 2} />
      ))}
      
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 3} />
      ))}
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedMessages.map((message, index) => (
            <div key={message.message_uuid} className={index % 2 === 1 ? 'flex justify-end' : 'flex justify-start'}>
              <MessageCard
                messageData={message}
                onHeartClick={() => handleHeartClick(message.message_uuid)}
                isLiked={likes[message.message_uuid]}
                isRight={index % 2 === 1}
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
};

export default LoveMessagesBoard;