import React from 'react';
import FeatureSection from './components/web/FeatureSection';
import CTASection from './components/web/CTASection';
import Features from './components/web/Features';
import FAQSection from './components/web/FAQSection';
import GuideCards from './components/web/GuideCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with GuideCards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            {/* Left column */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">
                Clear Your Mind, <span className="text-blue-600">Shape Your Ideas.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your writing tool to help you document, organize, learn about, and execute your ideas better.
              </p>
              <div className="flex items-center justify-left lg:justify-start mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">Loved by 79+ customers</span>
              </div>
              <div className="flex justify-left lg:justify-start">
                <a
                  href="https://www.producthunt.com/posts/prune-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-prune&#0045;3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=421168&theme=light"
                    alt="Prune - Simple&#0032;content&#0032;tools&#0032;for&#0032;startups | Product Hunt"
                    style={{ width: '250px', height: 'auto' }}
                    width="250"
                    className="p-4"
                  />
                </a>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:w-1/2">
              <GuideCards />
            </div>
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
    </div>
  );
}