import React from 'react';

export const AnimationStyles = () => (
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