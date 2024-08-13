import React from 'react';
import { BookOpenIcon, LightBulbIcon, PencilSquareIcon, RocketLaunchIcon, ScissorsIcon, ChartBarIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Document',
    description: 'Capture your thoughts and ideas effortlessly with our intuitive interface.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Organize',
    description: 'Structure your ideas into coherent plans and projects with powerful organization tools.',
    icon: BookOpenIcon,
  },
  {
    name: 'Learn',
    description: 'Gain insights from your ideas with AI-powered analysis and research assistance.',
    icon: LightBulbIcon,
  },
  {
    name: 'Execute',
    description: 'Turn your ideas into reality with actionable steps and progress tracking.',
    icon: RocketLaunchIcon,
  },
];

const pruneFeatures = [
  {
    name: 'Summarize',
    description: 'Get concise summaries of lengthy texts, extracting key information efficiently.',
    icon: ScissorsIcon,
  },
  {
    name: 'Analyze',
    description: 'Uncover important keywords, themes, and statistics from your documents.',
    icon: ChartBarIcon,
  },
  {
    name: 'Time-Saving',
    description: 'Drastically reduce reading time without sacrificing comprehension.',
    icon: ClockIcon,
  },
  {
    name: 'Enhance Understanding',
    description: 'Gain deeper insights with AI-powered content analysis and visualization.',
    icon: MagnifyingGlassIcon,
  },
];

export default function About() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100/20">
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Clear Your Mind, <span className="text-indigo-600">Shape Your Ideas</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  Your writing tool to help you document, organize, learn about, and execute your ideas better. Now powered by Prune, our AI reading assistant.
                </p>
              </div>
              <img
                src="/api/placeholder/1280/1024"
                alt="Mind mapping illustration with Prune AI"
                className="mt-10 rounded-lg shadow-xl sm:mt-16 lg:mt-0"
              />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600">Powerful features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your ideas
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Our platform provides a comprehensive set of tools to help you capture, develop, and implement your ideas effectively.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white p-6 rounded-lg shadow-md">
                <feature.icon className="h-8 w-8 text-indigo-600 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prune section */}
        <div className="bg-indigo-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600">Introducing Prune</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your AI-Powered Reading Assistant
              </p>
              <p className="mt-4 text-xl text-gray-600">
                Prune is an advanced AI tool that analyzes and summarizes text, helping you digest information quickly and efficiently.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pruneFeatures.map((feature) => (
                <div key={feature.name} className="bg-white p-6 rounded-lg shadow-md">
                  <feature.icon className="h-8 w-8 text-indigo-600 mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How Prune Works section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How Prune Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Prune uses advanced natural language processing to analyze your documents and provide valuable insights.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              { title: "1. Upload Your Document", description: "Simply upload or paste your text into Prune. It supports various formats, including PDFs, Word documents, and plain text." },
              { title: "2. AI Analysis", description: "Prune's AI engine quickly processes the text, identifying key themes, important facts, and overall structure." },
              { title: "3. Receive Insights", description: "Get a concise summary, key points, and visual representations of the content, allowing for quick comprehension and further exploration." }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-16 text-center sm:rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start shaping your ideas with Prune today
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Join thinkers, creators, and innovators who are using our platform and Prune to bring their ideas to life and digest information more efficiently.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <a href="#" className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">
                Get started with Prune
              </a>
              <a href="#" className="text-sm font-semibold text-white hover:text-gray-300">
                Learn more about Prune <span aria-hidden="true">→</span>
              </a>
            </div>
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
              <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}