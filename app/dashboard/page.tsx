import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

// Mock data for recent documents and stats
const recentDocuments = [
  { id: 1, title: 'Project Proposal', updatedAt: '2023-06-15' },
  { id: 2, title: 'Meeting Notes', updatedAt: '2023-06-14' },
  { id: 3, title: 'Product Roadmap', updatedAt: '2023-06-13' },
];

const stats = [
  { name: 'Total Ideas', value: '42' },
  { name: 'Documents', value: '18' },
  { name: 'Categories', value: '7' },
  { name: 'Executed Ideas', value: '3' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Your Idea Space</h1>

      {/* Quick Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Recent Documents */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Documents</h2>
        <ul className="divide-y divide-gray-200">
          {recentDocuments.map((doc) => (
            <li key={doc.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                  <p className="text-sm text-gray-500">Last updated on {doc.updatedAt}</p>
                </div>
                <div>
                  <Link href={`/dashboard/documents/${doc.id}`} className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                    View
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
