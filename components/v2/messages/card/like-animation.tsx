import { Heart } from 'lucide-react';

interface LikeAnimationProps {
  top: number;
  left: number;
}

export const LikeAnimation: React.FC<LikeAnimationProps> = ({ top, left }) => (
  <div className="absolute pointer-events-none" style={{ top, left }}>
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