import { useState } from 'react';
import { Heart } from 'lucide-react';
import { LikeAnimation } from './like-animation';
import { MessageModal } from '../modal/message-modal';

interface MessageCardProps {
  messageData: MessageData;
  onHeartClick: () => void;
  isLiked: boolean;
  isRight: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({ 
  messageData, 
  onHeartClick, 
  isLiked, 
  isRight 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
        className={`relative p-4 bg-gradient-to-br from-pink-50 to-white rounded-lg border-2 
          border-red-300 w-full max-w-64 shadow-md hover:shadow-lg transition-all duration-300 
          cursor-pointer ${isRight ? 'ml-auto' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="font-semibold text-sm text-red-400">
            À «{messageData.receiver}»
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleHeartClick}
              className="focus:outline-none transform transition-transform hover:scale-110"
            >
              <Heart 
                className={`w-5 h-5 transition-colors duration-300 
                  ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
              />
            </button>
            <span className="text-sm text-gray-600">{messageData.likes}</span>
          </div>
        </div>
        
        <p className="text-sm mb-4">
          {messageData.contenu.length > 100 
            ? `${messageData.contenu.substring(0, 100)}...` 
            : messageData.contenu}
        </p>
        <p className="text-right italic text-sm text-gray-600">«{messageData.sender}»</p>
        
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
