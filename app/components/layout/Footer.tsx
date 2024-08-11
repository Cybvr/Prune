import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-100 py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Prune</div>
        <nav className="flex flex-wrap justify-center mb-4 md:mb-0">
          {['Features', 'How It Works', 'Explore', 'Tasks', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-gray-600 hover:text-gray-800 mx-3 my-2 transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex space-x-4">
          {[
            { icon: Facebook, href: '#facebook', label: 'Facebook' },
            { icon: Twitter, href: '#twitter', label: 'Twitter' },
            { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <a 
              key={label}
              href={href}
              aria-label={label}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;