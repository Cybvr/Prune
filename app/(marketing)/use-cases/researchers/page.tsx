// app/use-cases/researchers/page.tsx
import React from 'react';

const ResearchersUseCasePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Prune for Researchers</h1>
      <p className="mb-8">
        Accelerate your research process with Prune. Our tool helps researchers quickly analyze and summarize large volumes of text, identify key concepts, and generate insights from complex data.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How Prune Empowers Researchers</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Rapidly review and summarize academic papers and reports</li>
        <li className="mb-2">Extract key findings and methodologies from multiple sources</li>
        <li className="mb-2">Identify trends and patterns in large datasets</li>
        <li className="mb-2">Generate literature reviews and bibliographies</li>
        <li className="mb-2">Collaborate effectively with research teams</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Features for Researchers</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Advanced Text Analysis: Uncover hidden connections and themes</li>
        <li className="mb-2">Citation Manager: Organize and format your references effortlessly</li>
        <li className="mb-2">Data Visualization: Transform complex data into clear, insightful visuals</li>
        <li className="mb-2">Collaborative Workspace: Share findings and collaborate in real-time</li>
        <li className="mb-2">Custom APIs: Integrate Prune with your existing research tools</li>
      </ul>

      <div className="bg-green-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Elevate Your Research Capabilities</h3>
        <p className="mb-4">Join leading researchers who use Prune to push the boundaries of knowledge.</p>
        <a href="/auth/register" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300">Start Researching Smarter</a>
      </div>
    </div>
  );
};

export default ResearchersUseCasePage;