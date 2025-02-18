import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { LikeAnimation } from '../card/like-animation';

interface MessageData {
  message_uuid: string;
  sender: string;
  receiver: string;
  contenu: string;
  likes: number;
}

interface MessageModalProps {
  messageData: MessageData;
  isOpen: boolean;
  onClose: () => void;
  isLiked: boolean;
  onHeartClick: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({ 
  messageData, 
  isOpen, 
  onClose, 
  isLiked, 
  onHeartClick 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });

  if (!isOpen) return null;

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
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white border-2 border-red-300 rounded-lg w-full max-w-md max-h-[80vh] 
          overflow-y-auto shadow-xl animate-in fade-in duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl text-red-400 font-semibold">
              À «{messageData.receiver}»
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none 
                transform transition-transform hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="leading-relaxed text-gray-700">{messageData.contenu}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-right italic text-sm text-gray-600">
              «{messageData.sender}»
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleHeartClick}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors duration-300 
                    ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
                />
              </button>
              <span className="text-gray-600">{messageData.likes}</span>
            </div>
          </div>
          
          {showAnimation && <LikeAnimation {...animationPosition} />}
        </div>
      </div>
    </div>
  );
};