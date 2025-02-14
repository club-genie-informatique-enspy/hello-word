import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TopicsSection = () => {
  const topics = [
    {
      id: 1,
      title: 'Technology',
      image: '/api/placeholder/400/320',
      position: 'left'
    },
    {
      id: 2,
      title: 'Environment',
      image: '/api/placeholder/400/320',
      position: 'center'
    },
    {
      id: 3,
      title: 'Business',
      image: '/api/placeholder/400/320',
      position: 'right'
    }
  ];

  return (
    <div className="relative bg-white py-16 px-8">
      {/* Decorative shapes */}
      <div className="absolute top-4 right-8 w-16 h-6 bg-blue-600 rounded-full transform rotate-12" />
      <div className="absolute top-12 left-12 w-16 h-6 bg-blue-600 rounded-full transform -rotate-12" />
      <div className="absolute bottom-32 right-24 w-16 h-6 bg-blue-600 rounded-full transform rotate-45" />

      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 max-w-xl">
          Find Your Best
          <br />
          <span className="text-blue-600">Article</span>
          <br />
          Topics here
        </h1>

        {/* Topics grid */}
        <div className="grid grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div key={topic.id} className="relative group">
              <div className="overflow-hidden rounded-3xl h-64 relative">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-6 left-6 text-white text-lg font-semibold">
                  {topic.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="p-2 border rounded-full hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Best Article Today section */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold mb-8">
            Best
            <br />
            Article
            <br />
            Today
          </h2>
          
          <div className="flex items-center justify-between mb-8">
            <button className="text-blue-600 font-medium">
              See All Articles
            </button>
          </div>

          {/* Article cards container */}
          <div className="flex gap-6 overflow-x-auto pb-6">
            {/* Article cards will be mapped here */}
            {/* You can use the ArticleCard component we created earlier */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsSection;