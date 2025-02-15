import { Heart } from "lucide-react";
import { LikeAnimation } from "@/components/v2/messages/LikeAnimation";

export const MessageCard = ({ message, onHeartClick, isLiked, likeCount, isRight }) => {
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
    <div className={`relative mt-16 p-4 bg-pink-50 rounded-lg border-2 border-red-300 w-64 shadow-md 
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