// app/cookies/page.tsx
import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4">
        This page explains how Prune uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2 className="text-2xl font-semibold mb-4">What are cookies?</h2>
      <p className="mb-4">
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Why do we use cookies?</h2>
      <p className="mb-4">
        We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics and other purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Types of cookies we use</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Essential website cookies</li>
        <li>Performance and functionality cookies</li>
        <li>Analytics and customization cookies</li>
        <li>Advertising cookies</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">How can you control cookies?</h2>
      <p className="mb-4">
        You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our use of cookies or other technologies, please email us at privacy@prune.ai.
      </p>
    </div>
  );
};

export default CookiesPage;