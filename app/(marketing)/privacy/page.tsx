// app/privacy/page.tsx
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At Prune, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and usage data.</p>

      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p className="mb-4">We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.</p>

      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p className="mb-4">We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.</p>

      <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
      <p className="mb-4">You have the right to access, correct, or delete your personal information. Contact us at privacy@prune.ai to exercise these rights.</p>

      <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
      <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4">If you have any questions about this privacy policy, please contact us at:</p>
      <p>Prune, Inc.<br/>
         123 Tech Street, Suite 456<br/>
         San Francisco, CA 94105<br/>
         Email: privacy@prune.ai</p>
    </div>
  );
};

export default PrivacyPage;