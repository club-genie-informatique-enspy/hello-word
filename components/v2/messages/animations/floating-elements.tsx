import { Heart } from 'lucide-react';

interface FloatingElementProps {
  delay: number;
}

export const FloatingBubble: React.FC<FloatingElementProps> = ({ delay }) => (
  <div 
    className="absolute w-4 h-4 rounded-full bg-blue-200/30"
    style={{
      animation: `float 15s infinite ${delay}s linear, sideWays 4s infinite ease-in-out`,
      left: `${Math.random() * 100}%`
    }}
  />
);

export const FloatingHeart: React.FC<FloatingElementProps> = ({ delay }) => (
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