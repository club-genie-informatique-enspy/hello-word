
// components/PhotoDetailModal.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';

interface PhotoDetailModalProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ photo, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Implémentation du partage (pourrait utiliser l'API Web Share si disponible)
    if (navigator.share) {
      navigator.share({
        title: `Photo par ${photo.signature}`,
        text: photo.description,
        url: window.location.href,
      }).catch((error) => console.log('Erreur lors du partage:', error));
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      alert('Lien copié dans le presse-papier!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white w-full max-w-lg md:max-w-xl rounded-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
              <Image 
                src="/avatar-placeholder.jpg" 
                alt={photo.signature}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{photo.signature}</p>
              <p className="text-xs text-gray-500">
                {new Date(photo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Photo */}
        <div className="relative w-full h-auto flex-grow overflow-hidden">
          <div className="relative w-full aspect-square">
            <Image
              src={photo.imageUrl}
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
            <span>{isLiked ? photo.likesCount + 1 : photo.likesCount} j'aime</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center space-x-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            <span>Partager</span>
          </button>
        </div>

        {/* Description */}
        <div className="p-4 max-h-[30vh] overflow-y-auto">
          <p className="font-medium text-sm mb-1">{photo.signature}</p>
          <p className="text-sm">{photo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailModal;