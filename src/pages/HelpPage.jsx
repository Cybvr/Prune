import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const HelpPage = () => {
  const faqs = [
    {
      question: "What is Prune?",
      answer: "Prune is a productivity app designed specifically for digital nomads, helping you manage tasks, set goals, and track your productivity across different locations."
    },
    {
      question: "How do I start a new challenge?",
      answer: "Navigate to the Challenges page, browse available challenges, and click 'Join Challenge' on the one you'd like to start."
    },
    // Add more FAQs as needed
  ];

  const releaseNotes = [
    {
      version: "1.2.0",
      date: "2023-07-01",
      notes: [
        "Added location-based task sorting",
        "Improved challenge tracking system",
        "Bug fixes and performance improvements"
      ]
    },
    // Add more release notes as needed
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Release Notes</h2>
        {releaseNotes.map((release, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-medium">Version {release.version} - {release.date}</h3>
            <ul className="list-disc list-inside ml-4">
              {release.notes.map((note, noteIndex) => (
                <li key={noteIndex}>{note}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HelpPage;