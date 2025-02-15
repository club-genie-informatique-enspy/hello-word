import { Heart } from 'lucide-react';

export const  LikeAnimation = ({ top, left }) => {
    return (
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
)};