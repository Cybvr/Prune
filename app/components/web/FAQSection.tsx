import React from 'react';

const faqs = [
  {
    question: "What is Prune?",
    answer: "Prune is an AI-powered writing tool designed to help you document, organize, learn about, and execute your ideas more effectively."
  },
  {
    question: "How does Prune work?",
    answer: "Prune uses advanced AI algorithms to analyze your writing, provide suggestions, and help you structure your thoughts. It offers features like content summarization, idea generation, and writing style improvement."
  },
  {
    question: "Is Prune free to use?",
    answer: "Prune offers a free tier with basic features. We also have premium plans with advanced capabilities for power users and teams. Check our pricing page for more details."
  },
  {
    question: "Can Prune integrate with other writing tools?",
    answer: "Yes, Prune can integrate with popular writing and productivity tools. We're constantly expanding our integration options. Please check our documentation for the latest list of supported integrations."
  },
  {
    question: "Is my data safe with Prune?",
    answer: "Absolutely. We take data privacy and security very seriously. All your data is encrypted, and we never share or sell your information. You can read more about our privacy practices in our Privacy Policy."
  }
];

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}