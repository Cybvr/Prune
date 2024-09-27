'use client'
  import React from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-64 mb-4">
      <input
        type="text"
        placeholder="Search documents..."
        className="w-full pl-10 pr-4 py-2 border border-input rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <XCircleIcon className="h-5 w-5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}