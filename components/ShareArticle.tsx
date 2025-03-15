'use client';

import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ShareArticle({ article  }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blog/${article.uuid}`
    : '';
  
  const shareOptions = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.titre)}&url=${encodeURIComponent(articleUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
        window.open(linkedinUrl, '_blank');
      }
    },
    {
      name: 'Copier le lien',
      icon: <LinkIcon className="w-5 h-5" />,
      action: () => {
        navigator.clipboard.writeText(articleUrl)
          .then(() => toast.success('Lien copié !'))
          .catch(() => toast.error('Erreur lors de la copie du lien'));
      }
    }
  ];
  
  return (
    <div className="relative">
      <button 
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        aria-label="Partager l'article"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm">Partager</span>
      </button>
      
      {showShareOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
          <div className="py-1 flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="font-medium">Partager</span>
              <button 
                onClick={() => setShowShareOptions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== 'Copier le lien') {
                    setShowShareOptions(false);
                  }
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                {option.icon}
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
  ;
}
