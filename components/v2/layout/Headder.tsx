// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// components/Header.tsx
import { FC } from 'react';
import { Search } from "lucide-react";
import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'RISEBLOG',
//   description: 'Your daily tech news',
// };




const Header: FC = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">
        RISE<span className="text-blue-600">BLOG</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/v2" className="hover:text-blue-600">Home</Link>
        <Link href="/v2/articles" className="text-blue-600">Article</Link>
        <Link href="/v2" className="hover:text-blue-600">About</Link>
        <Link href="/v2" className="hover:text-blue-600">Contact</Link>
        <button aria-label="Search" className="p-2">
          <Search size={20} />
        </button>
      </nav>
    </header>
  );
};

export default Header;