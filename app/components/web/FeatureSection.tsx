import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    name: 'Efficient Text Analysis',
    description:
      'Prune uses advanced natural language processing to analyze and summarize text quickly, helping you save time.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Consolidated Summaries',
    description:
      'Receive concise summaries of your text, extracting the most important information for better understanding.',
    icon: LockClosedIcon,
  },
  {
    name: 'Key Information Extraction',
    description:
      'Identify important keywords and phrases from your text to grasp the core message and relevant details swiftly.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Comprehensive Text Statistics',
    description:
      'Gain insights with detailed text statistics, including word count, character count, and more.',
    icon: FingerPrintIcon,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div className="bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Enhance Your Understanding</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            Harness the Power of Prune
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Prune is an AI-powered reading assistant designed to help you efficiently digest and understand written content. 
            With concise summaries, key information extraction, and comprehensive text statistics, you can enhance your comprehension and save time.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-200">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;