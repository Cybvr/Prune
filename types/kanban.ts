// File: @/types/kanban.ts

export type Document = {
  id: string;
  title: string;
  status: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  // Add any other fields your document might have
};

export type KanbanColumnType = {
  id: string;
  title: string;
};

// If you need any other types, add them here