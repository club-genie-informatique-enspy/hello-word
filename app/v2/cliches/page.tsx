'use client'

// pages/meilleur-cliche.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Photo } from '@/types/photo';
import RainbowPhotoGrid from '@/components/RainbowPhotoGrid';

export default function MeilleurClichePage() {
  // Pas d'état de chargement - affichage direct des données
  const [loading, setLoading] = useState(false);

  // Données de test
  const mockPhotos: Photo[] = [
    {
      id: '1',
      image_path: '/divers.jpg',
      description: 'Magnifique coucher de soleil sur la plage. Les couleurs orangées se reflètent dans l\'eau calme de l\'océan.',
     author_signature: 'photo_artiste1',
      likes_count: 56,
      name: 'Jean Dupont',
      aclass: 'Terminal S'
    },
    {
      id: '2',
      image_path: '/divers.jpg',
      description: 'Vue aérienne de la forêt en automne. Les feuilles rouges et oranges créent un tapis coloré.',
     author_signature: 'nature_lover',
      likes_count: 42, 
      name: 'Marie Martin',
      aclass: 'Première L'
    },
    {
      id: '3',
      image_path: '/divers.jpg',
      description: 'Portrait en noir et blanc capturant l\'émotion pure.',
     author_signature: 'photo_noir_blanc',
      likes_count: 38,
      name: 'Sophie Bernard',
      aclass: 'Terminal ES'
    },
    {
      id: '4',
      image_path: '/divers.jpg',
      description: 'Architecture moderne au cœur de la ville.',
     author_signature: 'urban_eye',
      likes_count: 29,
      name: 'Thomas Petit',
      aclass: 'Seconde'
    },
    {
      id: '5',
      image_path: '/divers.jpg',
      description: 'Macro photographie d\'une goutte d\'eau sur une feuille.',
     author_signature: 'tiny_worlds',
      likes_count: 51,
      name: 'Julie Morel',
      aclass: 'Terminal S'
    },
    {
      id: '6',
      image_path: '/divers.jpg',
      description: 'Scène de rue animée en plein cœur de Tokyo.',
     author_signature: 'travel_moments',
      likes_count: 33,
      name: 'Alexandre Robin',
      aclass: 'Première S'
    },
    {
      id: '7',
      image_path: '/divers.jpg',
      description: 'Danse contemporaine capturée avec une longue exposition.',
     author_signature: 'move_art',
      likes_count: 47,
      name: 'Camille Dubois',
      aclass: 'Terminal L'
    },
    {
      id: '8',
      image_path: '/divers.jpg',
      description: 'Reflets abstraits dans les flaques d\'eau après la pluie.',
     author_signature: 'reflect_vision',
      likes_count: 25,
      name: 'Lucas Martin',
      aclass: 'Seconde'
    },
    {
      id: '9',
      image_path: '/divers.jpg',
      description: 'Ciel étoilé au-dessus des montagnes, voie lactée visible.',
     author_signature: 'star_hunter',
      likes_count: 62,
      name: 'Emma Leroy',
      aclass: 'Terminal S'
    },
    {
      id: '10',
      image_path: '/divers.jpg',
      description: 'Texture abstraite d\'un mur ancien avec des graffitis.',
     author_signature: 'texture_addict',
      likes_count: 18,
      name: 'Hugo Blanc',
      aclass: 'Première ES'
    },
    {
      id: '11',
      image_path: '/divers.jpg',
      description: 'Festival de lumières dans la nuit urbaine.',
     author_signature: 'light_chaser',
      likes_count: 36,
      name: 'Léa Mercier',
      aclass: 'Terminal S'
    },
    {
      id: '12',
      image_path: '/divers.jpg',
      description: 'Silhouette au coucher du soleil sur la falaise.',
     author_signature: 'shadow_artist',
      likes_count: 41,
      name: 'Maxime Fournier',
      aclass: 'Première L'
    }
  ];

  return (
    <>
      <Head>
        <title>Meilleur Cliché | Notre Galerie</title>
        <meta name="description" content="Découvrez les meilleurs clichés de notre communauté" />
      </Head>

      <main className="min-h-screen bg-white pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div 
              className="rounded-full h-12 w-12" 
              style={{ 
                background: 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',
                animation: 'spin 1s linear infinite',
                maskImage: 'radial-gradient(transparent 40%, black 50%)',
                WebkitMaskImage: 'radial-gradient(transparent 40%, black 50%)'
              }} 
            />
          </div>
        ) : (
          <RainbowPhotoGrid photos={mockPhotos} />
        )}
      </main>

      {/* Style pour l'animation arc-en-ciel */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
{/*
  'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Photo } from '@/types/photo';
import RainbowPhotoGrid from '@/components/RainbowPhotoGrid';
import { getAllClichers } from '@/app/lib/clichers';

export default function MeilleurClichePage() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    async function fetchClichers() {
      try {
        const response = await getAllClichers(""); // Remplace "" par un activity_uuid si nécessaire
        setPhotos(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des clichés:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClichers();
  }, []);

  return (
    <>
      <Head>
        <title>Meilleur Cliché | Notre Galerie</title>
        <meta name="description" content="Découvrez les meilleurs clichés de notre communauté" />
      </Head>

      <main className="min-h-screen bg-white pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div 
              className="rounded-full h-12 w-12" 
              style={{ 
                background: 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',
                animation: 'spin 1s linear infinite',
                maskImage: 'radial-gradient(transparent 40%, black 50%)',
                WebkitMaskImage: 'radial-gradient(transparent 40%, black 50%)'
              }} 
            />
          </div>
        ) : (
          <RainbowPhotoGrid photos={photos} />
        )}
      </main>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

  */}