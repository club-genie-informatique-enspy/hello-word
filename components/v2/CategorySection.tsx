'use client'
  import { FC } from 'react';
  
  interface Category {
    title: string;
    image: string;
  }
  
  const categories: Category[] = [
    { title: 'Technology', image: '/api/placeholder/400/320' },
    { title: 'Environment', image: '/api/placeholder/400/320' },
    { title: 'Business', image: '/api/placeholder/400/320' },
  ];
  
  const CategorySection: FC = () => {
    return (
      <section className="py-12 px-4">
        <h2 className="text-4xl font-bold mb-8">
          Find Your Best<br />
          <span className="text-blue-600">Article</span><br />
          Topics here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden h-48">
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white font-semibold">
                {category.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default CategorySection;