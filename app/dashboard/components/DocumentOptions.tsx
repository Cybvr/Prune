'use client';

import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { StarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import format from 'date-fns/format';

interface DocumentOptionsProps {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedPriority: string | null;
  setSelectedPriority: (priority: string | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
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
  // Ensure dates are converted to the correct format for the Calendar component
  const startDateFormatted = startDate ? new Date(startDate) : null;
  const endDateFormatted = endDate ? new Date(endDate) : null;

  return (
    <div className="p-2 shadow-md rounded-md text-sm bg-card text-card-foreground">
      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1 text-muted-foreground">Status</label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
        <label className="block text-xs font-semibold mb-1 text-muted-foreground">Priority</label>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
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
        <label className="block text-xs font-semibold mb-1 text-muted-foreground">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-xs bg-background text-foreground">
              {startDateFormatted ? format(startDateFormatted, 'PPP') : 'Select start date'}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-xs">
            <Calendar selected={startDateFormatted} onDateChange={setStartDate} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-2">
        <label className="block text-xs font-semibold mb-1 text-muted-foreground">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-xs bg-background text-foreground">
              {endDateFormatted ? format(endDateFormatted, 'PPP') : 'Select end date'}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-xs">
            <Calendar selected={endDateFormatted} onDateChange={setEndDate} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-2">
        <Button
          variant={favorite ? "solid" : "outline"}
          onClick={() => setFavorite(!favorite)}
          className={`w-full text-xs ${favorite ? "bg-secondary text-primary" : "bg-background text-foreground"}`}
        >
          <StarIcon className={`h-4 w-4 mr-2 ${favorite ? "text-yellow-400" : "text-muted-foreground"}`} />
          {favorite ? "Marked as Favorite" : "Mark as Favorite"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentOptions;