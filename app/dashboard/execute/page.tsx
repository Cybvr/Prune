import { RocketLaunchIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const projects = [
  { id: 1, name: 'Mobile App Development', status: 'In Progress', completion: 60, dueDate: '2023-08-15' },
  { id: 2, name: 'Website Redesign', status: 'Completed', completion: 100, dueDate: '2023-06-30' },
  { id: 3, name: 'Marketing Campaign', status: 'Planning', completion: 20, dueDate: '2023-09-01' },
  { id: 4, name: 'Product Launch', status: 'On Hold', completion: 40, dueDate: '2023-10-15' },
];

export default function ExecutePage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Execute Ideas</h1>
          <p className="mt-2 text-sm text-gray-700">Track the progress of your ideas as they turn into reality.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New project
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
                    Project
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Completion
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Due Date
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <div className="flex items-center">
                        <RocketLaunchIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2">{project.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-50 text-green-700' :
                        project.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                        project.status === 'On Hold' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-50 text-gray-700'
                      }`}>
                        {project.status === 'Completed' ? <CheckCircleIcon className="mr-1 h-4 w-4" /> : null}
                        {project.status === 'On Hold' ? <XCircleIcon className="mr-1 h-4 w-4" /> : null}
                        {project.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold inline-block text-gray-600">{`${project.completion}%`}</span>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex bg-gray-200 rounded">
                          <div
                            style={{ width: `${project.completion}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              project.completion === 100 ? 'bg-green-500' :
                              project.completion >= 50 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(project.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {project.name}</span>
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