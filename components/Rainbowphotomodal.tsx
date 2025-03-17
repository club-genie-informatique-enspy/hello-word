// components/RainbowPhotoDetailModal.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';

interface RainbowPhotoDetailModalProps {
  photo: Photo;
  onClose: () => void;
  colorIndex: number;
  rainbowColors: string[];
  rainbowGradient: string;
}

const RainbowPhotoDetailModal: React.FC<RainbowPhotoDetailModalProps> = ({ 
  photo, 
  onClose, 
  colorIndex,
  rainbowColors,
  rainbowGradient
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(photo.likes_count);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleShare = () => {
    // Implémentation du partage (pourrait utiliser l'API Web Share si disponible)
    if (navigator.share) {
      navigator.share({
        title: `Photo par ${photo.author_signature}`,
        text: photo.description,
        url: window.location.href,
      }).catch((error) => console.log('Erreur lors du partage:', error));
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      alert('Lien copié dans le presse-papier!');
    }
  };

  // Couleur thématique pour cet élément basé sur son index
  const themeColor = rainbowColors[colorIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div style={{ background: rainbowGradient, padding: '3px', borderRadius: '12px' }} className="max-w-lg w-full overflow-hidden">
        <div className="bg-white rounded-lg max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden" style={{ 
                padding: '2px',
                background: themeColor,
              }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image 
                    src="/avatar-placeholder.jpg" 
                    alt={photo.author_signature}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium text-sm" style={{ color: themeColor }}>{photo.author_signature}</p>
              
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Photo */}
          <div className="relative w-full flex-grow overflow-hidden">
            <div className="relative w-full aspect-square">
              <Image
                src={photo.image_path}
                alt={photo.description}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Interaction buttons */}
          <div className="p-4 border-t border-b flex justify-between items-center">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <svg 
                className="w-6 h-6"
                fill={isLiked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: isLiked ? themeColor : 'currentColor' }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              <span style={{ color: isLiked ? themeColor : 'inherit' }}>{currentLikes} j'aime</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 group"
            >
              <svg className="w-6 h-6 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
                />
              </svg>
              <span className="group-hover:text-purple-500 transition-colors">Partager</span>
            </button>
          </div>

          {/* Description */}
          <div className="p-4 max-h-[30vh] overflow-y-auto">
            <p className="font-medium text-sm mb-1" style={{ color: themeColor }}>{photo.author_signature}</p>
            <p className="text-sm">{photo.description}</p>
            
            {/* Tags arc-en-ciel */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1">
                {rainbowColors.map((color, idx) => (
                  <span 
                    key={idx}
                    style={{ 
                      backgroundColor: `${color}20`, 
                      color: color 
                    }} 
                    className="text-xs px-2 py-1 rounded-full"
                  >
                    #{['photo', 'art', 'créativité', 'journée culturelle', 'photographie', 'enspy', 'talent'][idx]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainbowPhotoDetailModal;