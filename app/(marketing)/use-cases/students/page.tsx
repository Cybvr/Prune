// app/use-cases/students/page.tsx
import React from 'react';

const StudentsUseCasePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Prune for Students</h1>
      <p className="mb-8">
        Enhance your learning experience with Prune. Our tool helps students efficiently digest and understand complex information, making studying more effective and less time-consuming.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How Prune Helps Students</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Summarize lengthy textbooks and research papers quickly</li>
        <li className="mb-2">Extract key concepts and definitions for easier memorization</li>
        <li className="mb-2">Generate study guides from your notes</li>
        <li className="mb-2">Improve reading comprehension and retention</li>
        <li className="mb-2">Organize and prioritize information for assignments and exams</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Features for Students</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Smart Summaries: Get concise overviews of lengthy texts</li>
        <li className="mb-2">Concept Extraction: Identify and highlight key terms and ideas</li>
        <li className="mb-2">Study Guide Generator: Create customized study materials</li>
        <li className="mb-2">Progress Tracking: Monitor your learning and identify areas for improvement</li>
        <li className="mb-2">Collaboration Tools: Share and discuss study materials with classmates</li>
      </ul>

      <div className="bg-blue-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Start Boosting Your Academic Performance</h3>
        <p className="mb-4">Join thousands of students who are already using Prune to excel in their studies.</p>
        <a href="/auth/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Get Started</a>
      </div>
    </div>
  );
};

export default StudentsUseCasePage;