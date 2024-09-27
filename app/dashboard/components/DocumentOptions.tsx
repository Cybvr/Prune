'use client';

import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { StarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';

interface DocumentOptionsProps {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedPriority: string | null;
  setSelectedPriority: (priority: string | null) => void;
  startDate: string | null;
  setStartDate: (date: string | null) => void;
  endDate: string | null;
  setEndDate: (date: string | null) => void;
  favorite: boolean;
  setFavorite: (fav: boolean) => void;
}

const statuses = ["Backlog", "Planned", "In Progress", "Completed", "Canceled"];
const priorities = ["No Priority", "Low", "Medium", "High", "Urgent"];

const DocumentOptions: React.FC<DocumentOptionsProps> = ({
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  favorite,
  setFavorite,
}) => {
  // Convert ISO string dates to Date objects for the Calendar component
  const startDateFormatted = startDate ? parseISO(startDate) : null;
  const endDateFormatted = endDate ? parseISO(endDate) : null;

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date ? date.toISOString() : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date ? date.toISOString() : null);
  };

  return (
    <div className="bg-white p-2 shadow-md rounded-md text-sm">
      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1">Status</label>
        <Select value={selectedStatus || undefined} onValueChange={setSelectedStatus}>
          <SelectTrigger className="text-xs">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1">Priority</label>
        <Select value={selectedPriority || undefined} onValueChange={setSelectedPriority}>
          <SelectTrigger className="text-xs">
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            {priorities.map((priority, index) => (
              <SelectItem key={index} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-xs">
              {startDateFormatted ? format(startDateFormatted, 'PPP') : 'Select start date'}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-xs">
            <Calendar
              mode="single"
              selected={startDateFormatted}
              onSelect={handleStartDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-xs">
              {endDateFormatted ? format(endDateFormatted, 'PPP') : 'Select end date'}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-xs">
            <Calendar
              mode="single"
              selected={endDateFormatted}
              onSelect={handleEndDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-2">
        <Button
          variant={favorite ? "solid" : "outline"}
          onClick={() => setFavorite(!favorite)}
          className="w-full text-xs"
        >
          <StarIcon className={`h-4 w-4 mr-2 ${favorite ? "text-yellow-400" : "text-gray-500"}`} />
          {favorite ? "Marked as Favorite" : "Mark as Favorite"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentOptions;