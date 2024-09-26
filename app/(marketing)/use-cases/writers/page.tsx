// app/use-cases/writers/page.tsx
import React from 'react';

const WritersUseCasePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Prune for Writers</h1>
      <p className="mb-8">
        Enhance your writing process with Prune. Our tool helps writers organize their thoughts, generate ideas, and refine their content, making the writing process more efficient and effective.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How Prune Empowers Writers</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Overcome writer's block with AI-powered idea generation</li>
        <li className="mb-2">Organize complex narratives and character arcs</li>
        <li className="mb-2">Refine your prose with advanced style and readability analysis</li>
        <li className="mb-2">Conduct efficient research and fact-checking</li>
        <li className="mb-2">Collaborate seamlessly with editors and co-authors</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Features for Writers</h2>
      <ul className="list-disc pl-5 mb-8">
        <li className="mb-2">Story Outliner: Develop and organize your narrative structure</li>
        <li className="mb-2">Character Development Tool: Create deep, consistent characters</li>
        <li className="mb-2">Style Analyzer: Refine your writing style and maintain consistency</li>
        <li className="mb-2">Research Assistant: Quickly gather and organize background information</li>
        <li className="mb-2">Version Control: Track changes and explore different narrative paths</li>
      </ul>

      <div className="bg-red-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Unlock Your Writing Potential</h3>
        <p className="mb-4">Join a community of writers who use Prune to craft compelling stories and content.</p>
        <a href="/auth/register" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">Start Writing Smarter</a>
      </div>
    </div>
  );
};

export default WritersUseCasePage;