import React from 'react';
import { CloudArrowUpIcon, LightBulbIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    name: 'Streamline Your Thoughts',
    description:
      'Our tool helps you quickly organize and summarize your ideas, making complex information easier to digest and understand.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Spark Creativity',
    description:
      'Transform your scattered thoughts into clear, actionable ideas. Our AI-powered assistant helps you connect the dots and uncover new insights.',
    icon: LightBulbIcon,
  },
  {
    name: 'Refine Your Vision',
    description:
      'Polish your ideas with advanced language processing. Get concise summaries, extract key information, and gain valuable insights to shape your thoughts effectively.',
    icon: PencilSquareIcon,
  },
];

const Features: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="lg:pr-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Shape Your Ideas</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Clear Your Mind, Unleash Your Potential</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our writing tool is your companion in documenting, organizing, and bringing your ideas to life. Let's transform your thoughts into clear, actionable plans together.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <img
                  src="/images/web/document-feature.webp"
                  alt="Feature illustration"
                  width={2432}
                  height={1442}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;