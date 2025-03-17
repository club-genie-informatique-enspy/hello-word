// Données de test (à remplacer par les vraies données de l'API)

export const mockPhotos: Photo[] = [
    {
      id: '1',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=1',
      description: 'Magnifique coucher de soleil sur la plage. Les couleurs orangées se reflètent dans l\'eau calme de l\'océan.',
      signature: 'photo_artiste1',
      likesCount: 56,
      createdAt: '2025-03-10T14:23:45Z',
      authorName: 'Jean Dupont',
      authorClass: 'Terminal S'
    },
    {
      id: '2',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=2',
      description: 'Vue aérienne de la forêt en automne. Les feuilles rouges et oranges créent un tapis coloré.',
      signature: 'nature_lover',
      likesCount: 42,
      createdAt: '2025-03-09T09:15:22Z',
      authorName: 'Marie Martin',
      authorClass: 'Première L'
    },
    {
      id: '3',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=3',
      description: 'Portrait en noir et blanc capturant l\'émotion pure.',
      signature: 'photo_noir_blanc',
      likesCount: 38,
      createdAt: '2025-03-08T18:45:12Z',
      authorName: 'Sophie Bernard',
      authorClass: 'Terminal ES'
    },
    {
      id: '4',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=4',
      description: 'Architecture moderne au cœur de la ville.',
      signature: 'urban_eye',
      likesCount: 29,
      createdAt: '2025-03-07T11:33:56Z',
      authorName: 'Thomas Petit',
      authorClass: 'Seconde'
    },
    {
      id: '5',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=5',
      description: 'Macro photographie d\'une goutte d\'eau sur une feuille.',
      signature: 'tiny_worlds',
      likesCount: 51,
      createdAt: '2025-03-06T15:22:37Z',
      authorName: 'Julie Morel',
      authorClass: 'Terminal S'
    },
    {
      id: '6',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=6',
      description: 'Scène de rue animée en plein cœur de Tokyo.',
      signature: 'travel_moments',
      likesCount: 33,
      createdAt: '2025-03-05T08:19:45Z',
      authorName: 'Alexandre Robin',
      authorClass: 'Première S'
    },
    {
      id: '7',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=7',
      description: 'Danse contemporaine capturée avec une longue exposition.',
      signature: 'move_art',
      likesCount: 47,
      createdAt: '2025-03-04T19:56:12Z',
      authorName: 'Camille Dubois',
      authorClass: 'Terminal L'
    },
    {
      id: '8',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=8',
      description: 'Reflets abstraits dans les flaques d\'eau après la pluie.',
      signature: 'reflect_vision',
      likesCount: 25,
      createdAt: '2025-03-03T14:28:33Z',
      authorName: 'Lucas Martin',
      authorClass: 'Seconde'
    },
    {
      id: '9',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=9',
      description: 'Ciel étoilé au-dessus des montagnes, voie lactée visible.',
      signature: 'star_hunter',
      likesCount: 62,
      createdAt: '2025-03-02T23:15:48Z',
      authorName: 'Emma Leroy',
      authorClass: 'Terminal S'
    },
    {
      id: '10',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=10',
      description: 'Texture abstraite d\'un mur ancien avec des graffitis.',
      signature: 'texture_addict',
      likesCount: 18,
      createdAt: '2025-03-01T12:44:21Z',
      authorName: 'Hugo Blanc',
      authorClass: 'Première ES'
    },
    {
      id: '11',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=11',
      description: 'Festival de lumières dans la nuit urbaine.',
      signature: 'light_chaser',
      likesCount: 36,
      createdAt: '2025-02-28T20:33:17Z',
      authorName: 'Léa Mercier',
      authorClass: 'Terminal S'
    },
    {
      id: '12',
      imageUrl: 'https://source.unsplash.com/random/1000x1000?sig=12',
      description: 'Silhouette au coucher du soleil sur la falaise.',
      signature: 'shadow_artist',
      likesCount: 41,
      createdAt: '2025-02-27T17:55:39Z',
      authorName: 'Maxime Fournier',
      authorClass: 'Première L'
    }
  ];

// pages/api/photos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Photo } from '@/types/photo';

// Ceci est un exemple d'API route pour récupérer les photos
// Dans une application réelle, vous récupéreriez ces données depuis une base de données
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Photo[]>
) {
  // Simuler un délai de réseau
  setTimeout(() => {
    res.status(200).json(mockPhotos);
  }, 300);
}
