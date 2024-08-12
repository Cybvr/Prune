import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const learningResources = [
  { id: 1, title: 'Introduction to AI', type: 'Course', duration: '4 weeks', progress: 75 },
  { id: 2, title: 'Data Science Fundamentals', type: 'Article', duration: '15 min read', progress: 100 },
  { id: 3, title: 'Machine Learning Basics', type: 'Video', duration: '1 hour', progress: 50 },
  { id: 4, title: 'Web Development Bootcamp', type: 'Course', duration: '8 weeks', progress: 25 },
];

export default function LearnPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Learning Resources</h1>
          <p className="mt-2 text-sm text-gray-700">Explore and track your progress on various learning materials.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Find new resources
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Duration
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Progress
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {learningResources.map((resource) => (
                  <tr key={resource.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <div className="flex items-center">
                        {resource.type === 'Course' ? (
                          <AcademicCapIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        ) : (
                          <BookOpenIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        )}
                        <span className="ml-2">{resource.title}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{resource.type}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{resource.duration}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-48 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${resource.progress}%` }}></div>
                        </div>
                        <span>{resource.progress}%</span>
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        View<span className="sr-only">, {resource.title}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}