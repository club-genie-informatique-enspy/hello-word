'use client'
const Sidebar = () => {
    const trending = [
      {
        id: 1,
        title: "How Will AI Image Generators Affect Artists?",
        author: {
          name: "Ray",
          avatar: "/images/logo-light-2.png"
        },
        tags: ["AI", "Tech"]
      },
    ];
  
    const recommendedUsers = [
      {
        id: 1,
        name: "Joana Marie Jones",
        avatar: "/images/logo-light-2.png"
      },
      {
        id: 2,
        name: "Jousef Hanafi",
        avatar: "/images/logo-light-2.png"
      },
    ];
  
    return (
      <div className="w-80 space-y-8">
        {/* Trending Section */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-lg mb-4">Trending</h2>
          <div className="space-y-4">
            {trending.map(article => (
              <div key={article.id} className="flex gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-12 object-cover"
                />
                <div>
                  <h3 className="font-medium text-sm">{article.title}</h3>
                  <div className="flex gap-2 mt-1">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs text-blue-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Recommended Users Section */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-lg mb-4">Recommended Users</h2>
          <div className="space-y-4">
            {recommendedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button className="text-blue-600 text-sm font-medium px-4 py-1 rounded-full border border-blue-600">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;