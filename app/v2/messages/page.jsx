'use client'
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

// Composant pour les bulles flottantes
const FloatingBubble = ({ delay }) => (
  <div 
    className="absolute w-4 h-4 rounded-full bg-blue-200/30"
    style={{
      animation: `float 15s infinite ${delay}s linear, sideWays 4s infinite ease-in-out`,
      left: `${Math.random() * 100}%`
    }}
  />
);

// Composant pour les cœurs flottants
const FloatingHeart = ({ delay }) => (
  <div 
    className="absolute text-red-300/30"
    style={{
      animation: `floatHeart 20s infinite ${delay}s linear`,
      left: `${Math.random() * 100}%`
    }}
  >
    <Heart size={24} fill="currentColor" />
  </div>
);

// Animation de like
const LikeAnimation = ({ top, left }) => (
  <div 
    className="absolute pointer-events-none"
    style={{ top, left }}
  >
    <div className="relative">
      {[...Array(6)].map((_, i) => (
        <Heart 
          key={i}
          size={16}
          className="absolute text-red-500 animate-float-away"
          style={{
            animation: `floatAway 1s forwards ${i * 0.1}s`,
            transform: `rotate(${i * 60}deg)`
          }}
        />
      ))}
    </div>
  </div>
);

const MessageCard = ({ message, onHeartClick, isLiked, likeCount, isRight }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });

  const handleHeartClick = (e) => {
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
    <div className={`relative p-4 bg-pink-50 rounded-lg border-2 border-red-300 w-64 shadow-md 
      hover:shadow-lg transition-shadow duration-300
      ${isRight ? 'ml-auto' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold">À «Ma tendre et douce»</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleHeartClick}
            className="focus:outline-none transform transition-transform hover:scale-110"
          >
            <Heart 
              className={`w-5 h-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
            />
          </button>
          <span className="text-sm text-gray-600">{likeCount}</span>
        </div>
      </div>
      
      <p className="text-sm mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Minima sint modi autem quas! Enim, facilis.
      </p>
      
      <p className="text-right italic text-sm">«Ton admirateur»</p>
      
      {showAnimation && <LikeAnimation {...animationPosition} />}
    </div>
  );
};

const LoveMessagesBoard = () => {
  const [likes, setLikes] = useState(Array(6).fill(false));
  const [likeCounts, setLikeCounts] = useState(Array(6).fill(0));

  const handleHeartClick = (index) => {
    setLikes(prev => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
    
    setLikeCounts(prev => {
      const newCounts = [...prev];
      newCounts[index] = prev[index] + (likes[index] ? -1 : 1);
      return newCounts;
    });
  };

  const gridLayout = [[0, 1, 2], [3, 4, 5]];

  return (
    <div className="relative p-8 bg-white border-2 border-gray-200 rounded-xl min-h-screen overflow-hidden">
      {/* Bulles d'eau en arrière-plan */}
      {[...Array(15)].map((_, i) => (
        <FloatingBubble key={`bubble-${i}`} delay={i * 2} />
      ))}
      
      {/* Cœurs flottants en arrière-plan */}
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 3} />
      ))}
      
      <div className="relative flex flex-col gap-8">
        {gridLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between gap-8">
            {row.map((cardIndex) => (
              <div key={cardIndex} className="flex-1 flex justify-center">
                <MessageCard
                  onHeartClick={() => handleHeartClick(cardIndex)}
                  isLiked={likes[cardIndex]}
                  likeCount={likeCounts[cardIndex]}
                  isRight={cardIndex % 2 === 1}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles d'animation globaux à ajouter en CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
  }
  
  @keyframes sideWays {
    0% { margin-left: 0; }
    50% { margin-left: 50px; }
    100% { margin-left: 0; }
  }
  
  @keyframes floatHeart {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes floatAway {
    0% { 
      transform: translate(0, 0) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% { 
      transform: translate(var(--tx, 50px), var(--ty, -50px)) rotate(var(--r, 90deg)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export default LoveMessagesBoard;