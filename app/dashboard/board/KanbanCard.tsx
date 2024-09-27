'use client'
import React, { useState, KeyboardEvent } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import Link from 'next/link';
import { Document } from '@/types/kanban';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon, FlagIcon, FireIcon } from '@heroicons/react/24/solid';

type KanbanCardProps = {
  document: Document;
  provided: DraggableProvided;
  handleDelete: (ids: string[]) => Promise<void>;
  handleRename: (id: string, newTitle: string) => Promise<void>;
  toggleSelectDocument: (id: string) => void;
  isSelected: boolean;
};

export default function KanbanCard({
  document,
  provided,
  handleDelete,
  handleRename,
  toggleSelectDocument,
  isSelected,
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(document.title);

  const priorityIcons = {
    Low: <FlagIcon className="h-4 w-4 text-blue-500" />,
    Medium: <ExclamationCircleIcon className="h-4 w-4 text-yellow-500" />,
    High: <FireIcon className="h-4 w-4 text-red-500" />,
  };

  const onRename = async () => {
    if (editedTitle.trim() !== '' && editedTitle !== document.title) {
      await handleRename(document.id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRename();
    } else if (e.key === 'Escape') {
      setEditedTitle(document.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-background p-4 mb-2 rounded-md shadow ${
        isSelected ? 'border-2 border-primary' : ''
      } min-h-[120px] flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelectDocument(document.id)}
            className="mr-2"
          />
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={onRename}
              onKeyDown={handleKeyDown}
              className="text-sm font-medium text-foreground bg-transparent border-b border-primary focus:outline-none"
              autoFocus
            />
          ) : (
            <Link href={`/dashboard/documents/${document.id}`} className="text-sm font-medium text-foreground">
              {document.title}
            </Link>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <PencilIcon className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete([document.id])}>
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            {/* Add priority change options here */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          {priorityIcons[document.priority]}
          <span className="ml-1">{document.priority} Priority</span>
        </div>
        <span>Updated: {new Date(document.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}