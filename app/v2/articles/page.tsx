// app/for-you/page.tsx
'use client';

import ArticlesList from '@/components/v2/ArticlesList';
import Sidebar from '@/components/v2/Sidebar';
import CategoryFilter from '@/components/v2/CategorySection';
import { Search } from 'lucide-react';

export default function ForYouPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">For you</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Create Account
          </button>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap">
              Technology
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap">
              Environment
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap">
              Business
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap">
              Politics
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-2">
            <ArticlesList />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
