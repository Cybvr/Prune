'use client'

import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$15',
    priceAnnually: '$144',
    description: 'All the basics for starting a new business',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
  },
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '$30',
    priceAnnually: '$288',
    description: 'Everything you need for a growing business',
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time', 'Marketing automations'],
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '$60',
    priceAnnually: '$576',
    description: 'Advanced features for scaling your business',
    features: ['Unlimited products', 'Unlimited subscribers', 'Advanced analytics', '1-hour, dedicated support response time', 'Marketing automations', 'Custom integrations'],
  },
];

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];

export default function PricingComponent() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that's packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
            <button
              className={classNames(
                !annual ? 'bg-indigo-600 text-white' : 'text-gray-500',
                'cursor-pointer rounded-full px-2.5 py-1'
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={classNames(
                annual ? 'bg-indigo-600 text-white' : 'text-gray-500',
                'cursor-pointer rounded-full px-2.5 py-1'
              )}
              onClick={() => setAnnual(true)}
            >
              Annually
            </button>
          </div>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10"
            >
              <h3 id={tier.id} className="text-lg font-semibold leading-8 text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{annual ? tier.priceAnnually : tier.priceMonthly}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{annual ? '/year' : '/month'}</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className="mt-6 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy plan
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}