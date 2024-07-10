import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileHeader = ({ toggleMobileMenu }) => {
  return (
    <header className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <Link to="/">
        <img src="assets/images/pruneLogoBlack.svg" alt="Prune Logo" className="w-24 dark:invert" />
      </Link>
      <button onClick={toggleMobileMenu} className="p-2">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default MobileHeader;