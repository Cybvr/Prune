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

export default function FAQ() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100/20">
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
         
        </div>

        {/* FAQ section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600">Frequently asked questions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find answers to common questions
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Can't find the answer you're looking for? Reach out to our support team.
            </p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto divide-y divide-gray-900/10">
            <dl className="space-y-6 divide-y divide-gray-900/10">
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
      </main>
    </div>
  );
}