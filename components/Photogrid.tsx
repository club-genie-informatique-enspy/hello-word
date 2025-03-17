// components/PhotoGrid.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';
import PhotoDetailModal from './PhotoDetailModal';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour déterminer la taille de chaque photo en fonction du nombre de likes
  const getPhotoSize = (likes_count: number) => {
    // Par défaut, on utilise une taille aléatoire, mais celles avec beaucoup de likes sont plus grandes
    if (likes_count > 50) return "col-span-2 row-span-2"; // Grande
    if (likes_count > 30) return "col-span-2 row-span-1"; // Moyenne-Large
    if (likes_count > 20) return "col-span-1 row-span-2"; // Moyenne-Haute
    
    // Pour les photos avec moins de likes, assignation aléatoire
    const randomSize = Math.floor(Math.random() * 4);
    if (randomSize === 0 && likes_count > 10) return "col-span-2 row-span-1";
    if (randomSize === 1 && likes_count > 10) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1"; // Petite (taille standard)
  };

  const openPhotoDetail = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full bg-gray-100 rounded-lg py-2 px-4 outline-none"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-1 mt-2 md:grid-cols-3 sm:grid-cols-2">
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className={`relative bg-gray-100 ${getPhotoSize(photo.likes_count)}`}
            onClick={() => openPhotoDetail(photo)}
          >
            <div className="relative w-full h-full aspect-square overflow-hidden">
              <Image
                src={photo.image_path}
                alt={photo.description}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
              
              {/* Video icon if it's a video (just for the UI matching the screenshot) */}
              {Math.random() > 0.7 && (
                <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-5 flex justify-between items-center">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-2 border border-gray-300 rounded-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </button>
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image 
            src="/avatar-placeholder.jpg" 
            alt="Profil"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Photo Detail Modal */}
      {isModalOpen && selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PhotoGrid;
