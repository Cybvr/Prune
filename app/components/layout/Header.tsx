import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-white shadow-sm sticky top-0 p-4 z-50">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-800">Prune</div>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link href="#product" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Product</Link>
        <Link href="#about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">About</Link>
        <Link href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Pricing</Link>
        <Link href="#blog" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Blog</Link>
        <Link href="#faqs" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">FAQs</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">Login</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">Get Started</button>
      </div>
    </div>
  </header>
);

export default Header;