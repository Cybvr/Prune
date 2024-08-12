import React from 'react';
import { BookOpenIcon, LightBulbIcon, PencilSquareIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

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

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Clear Your Mind,{' '}
            <span className="text-blue-600">Shape Your Ideas</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
            Your writing tool to help you document, organize, learn about, and execute your ideas better.
          </p>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rest of the About page content */}
      </div>
    </div>
  );
}