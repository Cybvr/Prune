// components/CookiesPopup.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CookiesPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('acceptedCookies');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('acceptedCookies', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-sm mr-4">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <Link href="/cookies" className="text-blue-600 hover:underline">
            Learn more
          </Link>
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiesPopup;