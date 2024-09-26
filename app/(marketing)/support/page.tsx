// app/support/page.tsx
import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      <p className="mb-4">
        We're here to help! If you have any questions or issues, please don't hesitate to reach out.
      </p>
      {/* Add contact form or support information here */}
    </div>
  );
};

export default SupportPage;