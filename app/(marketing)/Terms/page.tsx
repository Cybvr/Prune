// app/terms/page.tsx
import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">
                By using Prune, you agree to these terms of service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using Prune's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

            <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
            <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms of Service.</p>

            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="mb-4">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">The content, features, and functionality of Prune are owned by Prune, Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
        </div>
    );
};

export default TermsPage;