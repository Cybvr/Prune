// app/dashboard/documents/DocumentsFilter.tsx

import React from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  setColumnFilters: (filters: { id: string, value: string }[]) => void;
  handleSearchChange: (value: string) => void;
  searchTerm: string;
};

const DocumentsFilter: React.FC<Props> = ({ setColumnFilters, handleSearchChange, searchTerm }) => (
  <div className="flex items-center space-x-2">
    {/* Filter status dropdown */}
    <select
      className="border border-input text-foreground bg-background rounded px-3 py-2"
      onChange={(e) => setColumnFilters([{ id: 'status', value: e.target.value }])}
    >
      <option value="">All Statuses</option>
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="completed">Completed</option>
      <option value="canceled">Canceled</option>
    </select>

    {/* Filter priority dropdown */}
    <select
      className="border border-input text-foreground bg-background rounded px-3 py-2"
      onChange={(e) => setColumnFilters([{ id: 'priority', value: e.target.value }])}
    >
      <option value="">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    {/* Search input */}
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-8 pr-4 py-2 border border-input bg-background text-foreground rounded"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={searchTerm}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      {searchTerm && (
        <button
          onClick={() => {
            handleSearchChange('');
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <XCircleIcon className="h-5 w-5 text-muted-foreground" />
        </button>
      )}
    </div>
  </div>
);

export default DocumentsFilter;