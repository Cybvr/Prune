import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AIReadingApp from './AIReadingApp';

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
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Roadmapping got easier</h2>
                <p className="text-gray-600 mb-6">Get through business problems with easy, step-by-step help.</p>
                <p className="text-gray-600 mb-6">Meet Coach, your AI buddy here to tailor solutions for your business challenges, be it marketing hiccups or operational glitches. Think of it as your anything-goes business game plan.</p>
                <a href="#get-started" className="text-blue-600 font-semibold hover:underline">Let's get Pruned →</a>
              </div>
              <div>
                <img src="/images/web/roadmap-feature.webp" alt="Roadmapping Feature" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Document Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/images/web/document-feature.webp" alt="Document Feature" className="rounded-lg shadow-lg" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Make it easier</h2>
                <p className="text-gray-600 mb-6">Turn your thoughts into ready-to-use resources</p>
                <p className="text-gray-600 mb-6">Picture a round-the-clock creative sidekick that never sleeps. That's the essence of our AI Tools. They're here to whip up everything from snappy company profiles to brand guidelines and emails. Just type, hit Enter, and voila!</p>
                <a href="#get-started" className="text-blue-600 font-semibold hover:underline">Let's get Pruned →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Bloom: Just Ask</h2>
                <p className="text-gray-600 mb-6">Tap into your creativity and career skills</p>
                <p className="text-gray-600 mb-6">Meet Ask Bloom, your helper for writing and staying productive. Whether it's creating engaging content or taking quick notes, Bloom's got your back. It's like having a 24/7 writing and task-management pro in your pocket!</p>
                <a href="#get-started" className="text-blue-600 font-semibold hover:underline">Let's get Pruned →</a>
              </div>
              <div>
                <img src="/images/web/chatbot-feature.webp" alt="Chatbot Feature" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the newsletter</h2>
            <p className="text-gray-600 mb-8">Stay up to date with all the news, insights, and updates we have coming.</p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-2 rounded-l-full border-t border-b border-l border-gray-300 focus:outline-none focus:border-blue-500" />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors duration-300">Subscribe</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}