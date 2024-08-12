import Link from 'next/link';
import { LightBulbIcon, DocumentTextIcon, FolderIcon, AcademicCapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const cards = [
  { name: 'Quick Add Idea', icon: LightBulbIcon, description: 'Capture your thoughts instantly', href: '/dashboard/ideas' },
  { name: 'Recent Documents', icon: DocumentTextIcon, description: 'View and edit your latest work', href: '/dashboard/documents' },
  { name: 'Categories', icon: FolderIcon, description: 'Organize your ideas and documents', href: '/dashboard/categories' },
  { name: 'Learning Suggestions', icon: AcademicCapIcon, description: 'Explore new topics and expand your knowledge', href: '/dashboard/learn' },
  { name: 'Execute Ideas', icon: RocketLaunchIcon, description: 'Turn your ideas into reality', href: '/dashboard/execute' },
];

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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card) => (
            <Link key={card.name} href={card.href} className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{card.description}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
