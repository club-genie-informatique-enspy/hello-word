
// components/LikeButton.tsx
// Composant optionnel que vous pourriez utiliser dans PhotoDetailModal
import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
  photoId: string;
  onLike?: (photoId: string, isLiked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, photoId, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = async () => {
    try {
      // Dans une application réelle, vous feriez un appel API ici
      // const response = await fetch(`/api/photos/${photoId}/like`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ liked: !isLiked })
      // });
      
      // if (response.ok) {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikesCount(prevCount => newIsLiked ? prevCount + 1 : prevCount - 1);
        
        if (onLike) {
          onLike(photoId, newIsLiked);
        }
      // }
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className="flex items-center space-x-1 focus:outline-none"
      aria-label={isLiked ? "Ne plus aimer" : "Aimer"}
    >
      <svg 
        className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} 
        fill={isLiked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="text-sm">{likesCount} j'aime</span>
    </button>
  );
};

export default LikeButton;
