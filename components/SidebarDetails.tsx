'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const SidebarDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Fonction pour basculer l'état d'ouverture de la sidebar sur mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-8 md:mb-0 w-full">
      {/* Bouton de toggle pour mobile uniquement */}
      <div 
        className="flex md:hidden items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer mb-4"
        onClick={toggleSidebar}
      >
        <h2 className="text-lg font-semibold">Options et suggestions</h2>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {/* Contenu de la sidebar - visible sur desktop, conditionnel sur mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 hidden md:block">For you</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or share" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Recommended Articles */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">The market for investment in Central Asia</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>John D.</span>
                  <span className="mx-2">•</span>
                  <span>Read more</span>
                </div>
              </div>
            </div>
          </div>
          {/* More recommended articles... */}
        </div>

        {/* Trending Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Trending</h2>
          <div className="space-y-4">
            {/* Trending items */}
            <div className="p-3 border rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium">Top trending technology in 2025</p>
              <span className="text-xs text-gray-500">2.5k views</span>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium">How AI is changing the finance industry</p>
              <span className="text-xs text-gray-500">1.8k views</span>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recommended topics</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Vie campus</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Regard sur le monde</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Future</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Tech</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Culture</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDetails;