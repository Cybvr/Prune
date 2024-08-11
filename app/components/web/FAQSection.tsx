"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "What is Prune?",
    answer:
      "Prune is an AI-powered reading assistant that quickly analyzes and summarizes text. Using advanced natural language processing, it extracts key information, providing users with concise summaries, important keywords, and text statistics. Prune helps you efficiently digest and understand written content, saving time and enhancing comprehension.",
  },
  {
    question: "How does Prune work?",
    answer:
      "Prune uses advanced natural language processing to analyze and summarize text. It extracts key information and provides users with concise summaries, important keywords, and text statistics. This helps users efficiently digest and understand written content, saving time and enhancing comprehension.",
  },
  {
    question: "What are the benefits of using Prune?",
    answer:
      "Prune helps you efficiently digest and understand written content by providing concise summaries, important keywords, and text statistics. This saves time and enhances comprehension, making it easier to manage and understand large amounts of text.",
  },
  // More questions...
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
