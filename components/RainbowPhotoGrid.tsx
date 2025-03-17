// components/RainbowPhotoGrid.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';
import RainbowPhotoDetailModal from './Rainbowphotomodal';

interface PhotoGridProps {
  photos: Photo[];
}

const RainbowPhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState(3); // Par défaut pour desktop
  const [organizedGrid, setOrganizedGrid] = useState<Photo[][]>([]);

  // Couleurs de l'arc-en-ciel
  const rainbowColors = [
    '#FF0000', // Rouge
    '#FF7F00', // Orange
    '#FFFF00', // Jaune
    '#00FF00', // Vert
    '#0000FF', // Bleu
    '#4B0082', // Indigo
    '#9400D3'  // Violet
  ];

  const rainbowGradient = 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)';

  // Fonction pour obtenir une couleur de l'arc-en-ciel basée sur l'index
  const getColorForIndex = (index: number) => {
    return rainbowColors[index % rainbowColors.length];
  };

  // Détecter la largeur de l'écran et ajuster le nombre de colonnes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(2); // Mobile
      } else if (window.innerWidth < 1024) {
        setColumns(2); // Tablette
      } else {
        setColumns(3); // Desktop
      }
    };

    handleResize(); // Appel initial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Organiser les photos en colonnes équilibrées chaque fois que le nombre de colonnes change
  useEffect(() => {
    if (photos.length === 0 || columns === 0) return;

    // Trier d'abord par nombre de likes (pour mettre les plus populaires en priorité)
    const sortedPhotos = [...photos].sort((a, b) => b.likesCount - a.likesCount);
    
    // Initialiser le tableau pour chaque colonne
    const grid: Photo[][] = Array.from({ length: columns }, () => []);
    
    // Distribution intelligente - placer chaque photo dans la colonne la moins haute
    sortedPhotos.forEach(photo => {
      // Trouver la colonne avec le moins de photos
      const shortestColumnIndex = grid
        .map((column, index) => ({ 
          index, 
          height: column.reduce((sum, p) => sum + getRelativeHeight(p), 0) 
        }))
        .sort((a, b) => a.height - b.height)[0].index;
      
      grid[shortestColumnIndex].push(photo);
    });
    
    setOrganizedGrid(grid);
  }, [photos, columns]);

  // Fonction pour déterminer la hauteur relative d'une photo (pour l'algorithme de placement)
  const getRelativeHeight = (photo: Photo) => {
    if (photo.likesCount > 50) return 2;
    if (photo.likesCount > 30) return 1.5;
    return 1;
  };

  // Fonction pour déterminer la taille de chaque photo dans le DOM
  const getPhotoHeight = (photo: Photo) => {
    if (photo.likesCount > 50) return "h-96"; // Grande
    if (photo.likesCount > 30) return "h-72"; // Moyenne
    if (photo.likesCount > 20) return "h-64"; // Assez grande
    return "h-52"; // Standard
  };

  const openPhotoDetail = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      {/* Search bar with rainbow theme */}
      <div style={{ background: rainbowGradient, padding: '2px', borderRadius: '12px' }} className="sticky top-0 z-10 mb-3">
        <div className="bg-white rounded-lg py-2 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full bg-gray-100 rounded-lg py-2 px-10 outline-none text-sm"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Flexbox masonry layout pour une meilleure occupation de l'espace */}
      <div className="flex gap-2 mt-2">
        {organizedGrid.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="flex-1 flex flex-col gap-2">
            {column.map((photo, photoIndex) => (
              <div 
                key={photo.id}
                className={`relative ${getPhotoHeight(photo)}`}
                onClick={() => openPhotoDetail(photo)}
                style={{ 
                  background: getColorForIndex(columnIndex * 10 + photoIndex), // Variation de couleur
                  borderRadius: '8px',
                  padding: '2px',
                }}
              >
                <div className="relative w-full h-full bg-white rounded-md overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.description}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer rounded-md"
                  />
                  
                  {/* Badge de likes avec couleur de l'arc-en-ciel */}
                  <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 flex items-center shadow-sm"
                       style={{ borderLeft: `3px solid ${getColorForIndex(columnIndex * 10 + photoIndex)}` }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" 
                        style={{ color: getColorForIndex(columnIndex * 10 + photoIndex) }}>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-xs font-medium ml-1" style={{ color: getColorForIndex(columnIndex * 10 + photoIndex) }}>{photo.likesCount}</span>
                  </div>
                  
                  {/* Video icon pour certaines photos (aléatoire) */}
                  {(columnIndex + photoIndex) % 3 === 0 && (
                    <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                          style={{ color: getColorForIndex(columnIndex * 10 + photoIndex) }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Photo Detail Modal with rainbow theme */}
      {isModalOpen && selectedPhoto && (
        <RainbowPhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setIsModalOpen(false)}
          colorIndex={photos.findIndex(p => p.id === selectedPhoto.id) % rainbowColors.length}
          rainbowColors={rainbowColors}
          rainbowGradient={rainbowGradient}
        />
      )}
    </div>
  );
};

export default RainbowPhotoGrid;