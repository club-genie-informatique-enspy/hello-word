import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-orange-500/20 rounded-full"></div>
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;