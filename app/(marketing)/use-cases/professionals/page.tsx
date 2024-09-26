// app/use-cases/professionals/page.tsx
import React from 'react';

const ProfessionalsUseCasePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Prune for Professionals</h1>
      <p className="mb-8">
        Boost your productivity with Prune. Our tool helps professionals quickly process and understand important documents, reports, and communications, enabling faster decision-making and more efficient work processes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How Prune Elevates Professional Work</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Quickly summarize lengthy reports and documents</li>
        <li className="mb-2">Extract key insights from market research and competitor analysis</li>
        <li className="mb-2">Streamline email communication by generating concise responses</li>
        <li className="mb-2">Prepare for meetings more effectively with smart briefing notes</li>
        <li className="mb-2">Enhance decision-making with data-driven insights</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Features for Professionals</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Executive Summaries: Generate concise overviews of lengthy documents</li>
        <li className="mb-2">Smart Email Assistant: Draft and optimize professional emails</li>
        <li className="mb-2">Meeting Prep Tool: Create agenda items and talking points</li>
        <li className="mb-2">Project Management Integration: Seamlessly connect with popular PM tools</li>
        <li className="mb-2">Customizable Templates: Tailor Prune to your specific industry needs</li>
      </ul>

      <div className="bg-purple-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Supercharge Your Professional Performance</h3>
        <p className="mb-4">Join successful professionals who use Prune to stay ahead in their careers.</p>
        <a href="/auth/register" className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">Elevate Your Work</a>
      </div>
    </div>
  );
};

export default ProfessionalsUseCasePage;