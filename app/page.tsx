import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AIReadingApp from './AIReadingApp';
import FeatureSection from './components/web/FeatureSection';
import CTASection from './components/web/CTASection';
import Features from './components/web/Features';
import FAQSection from './components/web/FAQSection';  // Import the new FAQSection component

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20 text-center">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">
              Clear Your Mind, <span className="text-blue-600">Shape Your Ideas.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">Your writing tool to help you document, organize, learn about, and execute your ideas better.</p>
            <div className="flex justify-center mb-8">
              <a href="https://www.producthunt.com/posts/prune-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-prune&#0045;3" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=421168&theme=light"
                  alt="Prune - Simple&#0032;content&#0032;tools&#0032;for&#0032;startups | Product Hunt"
                  style={{width: '200px', height: 'auto'}}
                  width="200"
                  className="p-4"
                />
              </a>
            </div>
            <div className="container mx-auto pt-8 px-6 sm:px-8 lg:px-16">
              <AIReadingApp />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* New Features Section */}
        <Features />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}