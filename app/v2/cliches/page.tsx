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
      imageUrl: '/divers.jpg',
      description: 'Magnifique coucher de soleil sur la plage. Les couleurs orangées se reflètent dans l\'eau calme de l\'océan.',
      signature: 'photo_artiste1',
      likesCount: 56,
      createdAt: '2025-03-10T14:23:45Z',
      authorName: 'Jean Dupont',
      authorClass: 'Terminal S'
    },
    {
      id: '2',
      imageUrl: '/divers.jpg',
      description: 'Vue aérienne de la forêt en automne. Les feuilles rouges et oranges créent un tapis coloré.',
      signature: 'nature_lover',
      likesCount: 42,
      createdAt: '2025-03-09T09:15:22Z',
      authorName: 'Marie Martin',
      authorClass: 'Première L'
    },
    {
      id: '3',
      imageUrl: '/divers.jpg',
      description: 'Portrait en noir et blanc capturant l\'émotion pure.',
      signature: 'photo_noir_blanc',
      likesCount: 38,
      createdAt: '2025-03-08T18:45:12Z',
      authorName: 'Sophie Bernard',
      authorClass: 'Terminal ES'
    },
    {
      id: '4',
      imageUrl: '/divers.jpg',
      description: 'Architecture moderne au cœur de la ville.',
      signature: 'urban_eye',
      likesCount: 29,
      createdAt: '2025-03-07T11:33:56Z',
      authorName: 'Thomas Petit',
      authorClass: 'Seconde'
    },
    {
      id: '5',
      imageUrl: '/divers.jpg',
      description: 'Macro photographie d\'une goutte d\'eau sur une feuille.',
      signature: 'tiny_worlds',
      likesCount: 51,
      createdAt: '2025-03-06T15:22:37Z',
      authorName: 'Julie Morel',
      authorClass: 'Terminal S'
    },
    {
      id: '6',
      imageUrl: '/divers.jpg',
      description: 'Scène de rue animée en plein cœur de Tokyo.',
      signature: 'travel_moments',
      likesCount: 33,
      createdAt: '2025-03-05T08:19:45Z',
      authorName: 'Alexandre Robin',
      authorClass: 'Première S'
    },
    {
      id: '7',
      imageUrl: '/divers.jpg',
      description: 'Danse contemporaine capturée avec une longue exposition.',
      signature: 'move_art',
      likesCount: 47,
      createdAt: '2025-03-04T19:56:12Z',
      authorName: 'Camille Dubois',
      authorClass: 'Terminal L'
    },
    {
      id: '8',
      imageUrl: '/divers.jpg',
      description: 'Reflets abstraits dans les flaques d\'eau après la pluie.',
      signature: 'reflect_vision',
      likesCount: 25,
      createdAt: '2025-03-03T14:28:33Z',
      authorName: 'Lucas Martin',
      authorClass: 'Seconde'
    },
    {
      id: '9',
      imageUrl: '/divers.jpg',
      description: 'Ciel étoilé au-dessus des montagnes, voie lactée visible.',
      signature: 'star_hunter',
      likesCount: 62,
      createdAt: '2025-03-02T23:15:48Z',
      authorName: 'Emma Leroy',
      authorClass: 'Terminal S'
    },
    {
      id: '10',
      imageUrl: '/divers.jpg',
      description: 'Texture abstraite d\'un mur ancien avec des graffitis.',
      signature: 'texture_addict',
      likesCount: 18,
      createdAt: '2025-03-01T12:44:21Z',
      authorName: 'Hugo Blanc',
      authorClass: 'Première ES'
    },
    {
      id: '11',
      imageUrl: '/divers.jpg',
      description: 'Festival de lumières dans la nuit urbaine.',
      signature: 'light_chaser',
      likesCount: 36,
      createdAt: '2025-02-28T20:33:17Z',
      authorName: 'Léa Mercier',
      authorClass: 'Terminal S'
    },
    {
      id: '12',
      imageUrl: '/divers.jpg',
      description: 'Silhouette au coucher du soleil sur la falaise.',
      signature: 'shadow_artist',
      likesCount: 41,
      createdAt: '2025-02-27T17:55:39Z',
      authorName: 'Maxime Fournier',
      authorClass: 'Première L'
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