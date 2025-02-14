'use client'
import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

// Styles intégrés pour les animations
const AnimationStyles = () => (
  <style jsx global>{`
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
    
    .animate-float-away:nth-child(1) { --tx: 60px; --ty: -40px; --r: 45deg; }
    .animate-float-away:nth-child(2) { --tx: 40px; --ty: -60px; --r: 90deg; }
    .animate-float-away:nth-child(3) { --tx: 10px; --ty: -70px; --r: 135deg; }
    .animate-float-away:nth-child(4) { --tx: -20px; --ty: -60px; --r: 180deg; }
    .animate-float-away:nth-child(5) { --tx: -40px; --ty: -40px; --r: 225deg; }
    .animate-float-away:nth-child(6) { --tx: -50px; --ty: -10px; --r: 270deg; }
  `}</style>
);

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
          className="absolute left-52 text-red-500 animate-float-away"
          style={{
            animation: `floatAway 1s forwards ${i * 0.1}s`,
            transform: `rotate(${i * 60}deg)`
          }}
        />
      ))}
    </div>
  </div>
);

// Popup Modal Component
const MessageModal = ({ messageData, isOpen, onClose, isLiked, likeCount, onHeartClick }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });

  if (!isOpen || !messageData) return null;
  
  const { sender, contenu, receiver } = messageData;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white border-2 border-red-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl text-red-400 font-semibold">À «{receiver}»</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="mb-4">{contenu}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-right italic text-sm">«{sender}»</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleHeartClick}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} 
                />
              </button>
              <span className="text-gray-600">{likeCount}</span>
            </div>
          </div>
          
          {showAnimation && <LikeAnimation {...animationPosition} />}
        </div>
      </div>
    </div>
  );
};

const MessageCard = ({ messageData, onHeartClick, isLiked, likeCount, isRight }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!messageData) return null;
  
  const { sender, contenu, receiver } = messageData;
  
  // Message to display (truncated)
  const truncatedContent = contenu.length > 100 
    ? `${contenu.substring(0, 100)}...`
    : contenu;

  const handleHeartClick = (e) => {
    e.stopPropagation();
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
    <>
      <div 
        className={`relative p-4 bg-pink-50 rounded-lg border-2 border-red-300 w-full max-w-64 shadow-md 
          hover:shadow-lg transition-all duration-300 cursor-pointer
          ${isRight ? 'ml-auto' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="font-semibold text-sm">À «{receiver}»</span>
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
        
        <p className="text-sm mb-4">{truncatedContent}</p>
        
        <p className="text-right italic text-sm">«{sender}»</p>
        
        {showAnimation && <LikeAnimation {...animationPosition} />}
      </div>

      <MessageModal
        messageData={messageData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLiked={isLiked}
        likeCount={likeCount}
        onHeartClick={onHeartClick}
      />
    </>
  );
};

const LoveMessagesBoard = () => {
  const [likes, setLikes] = useState(Array(6).fill(false));
  const [likeCounts, setLikeCounts] = useState(Array(6).fill(0));

  // Exemple de données structurées
  const messagesData = [
    {
      sender: "Ton admirateur secret",
      receiver: "Ma tendre et douce",
      contenu: "Les mots me manquent pour décrire la beauté de ton sourire, qui illumine mes journées même dans les moments les plus sombres. Tu es mon rayon de soleil."
    },
    {
      sender: "Julien",
      receiver: "Marie",
      contenu: "Chaque moment passé avec toi est un trésor que je garde précieusement dans mon cœur. Tu es la mélodie qui accompagne mes pensées jour et nuit."
    },
    {
      sender: "Un cœur épris",
      receiver: "Mon âme sœur",
      contenu: "Si je devais vivre mille vies, dans chacune d'elles, je te chercherais pour t'aimer encore et encore. Tu es mon éternité."
    },
    {
      sender: "Ton bien-aimé",
      receiver: "Ma chérie",
      contenu: "Ton rire est la plus belle musique à mes oreilles, une symphonie qui résonne en moi et me rappelle pourquoi la vie vaut la peine d'être vécue."
    },
    {
      sender: "Pierre",
      receiver: "Sophie",
      contenu: "Dans ce monde chaotique, tu es mon havre de paix, l'ancre qui me rattache à ce qui est vraiment important. Je t'aime plus que les mots ne peuvent l'exprimer."
    },
    {
      sender: "Ton capitaine",
      receiver: "Mon étoile polaire",
      contenu: "Comme les étoiles guident les navigateurs, ton amour guide mon cœur à travers les tempêtes de la vie. Tu es ma boussole, mon nord véritable."
    }
  ];

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

  return (
    <div className="relative p-4 md:p-8 bg-white border-2 border-gray-200 rounded-xl min-h-screen overflow-hidden">
      <AnimationStyles />
      
      {/* Bulles d'eau en arrière-plan */}
      {[...Array(15)].map((_, i) => (
        <FloatingBubble key={`bubble-${i}`} delay={i * 2} />
      ))}
      
      {/* Cœurs flottants en arrière-plan */}
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 3} />
      ))}
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {messagesData.map((messageData, index) => (
          <div key={index} className={index % 2 === 1 ? 'flex justify-end' : 'flex justify-start'}>
            <MessageCard
              messageData={messageData}
              onHeartClick={() => handleHeartClick(index)}
              isLiked={likes[index]}
              likeCount={likeCounts[index]}
              isRight={index % 2 === 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveMessagesBoard;