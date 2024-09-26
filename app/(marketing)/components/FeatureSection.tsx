import React from 'react';
import { BoltIcon, LightBulbIcon, PencilIcon, ChartBarIcon } from '@heroicons/react/24/solid';

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    name: 'Thought Organization',
    description:
      'Effortlessly structure your ideas with our intuitive tool, helping you create a clear mental map of your thoughts.',
    icon: BoltIcon, // Changed from BrainIcon to BoltIcon as there's no BrainIcon in the solid set
  },
  {
    name: 'Idea Refinement',
    description:
      'Polish your concepts with intelligent summaries and key information extraction, elevating your ideas to their full potential.',
    icon: LightBulbIcon,
  },
  {
    name: 'Creative Writing Assistant',
    description:
      'Let our AI-powered writing companion guide you through the creative process, offering suggestions and enhancing your narrative flow.',
    icon: PencilIcon,
  },
  {
    name: 'Insight Generation',
    description:
      'Uncover hidden connections and generate valuable insights with our advanced analysis tools, bringing depth to your ideas.',
    icon: ChartBarIcon,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Enhance Your Creativity</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Unlock the Power of Your Ideas
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our tool is designed to be your creative companion, helping you document, organize, and bring your ideas to life. 
            With intelligent features and a user-friendly interface, we're here to elevate your thought process and boost your productivity.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;