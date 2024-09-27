import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';
import { Document, KanbanColumnType } from '@/types/kanban';

type KanbanColumnProps = {
  column: KanbanColumnType;
  documents: Document[];
  handleDelete: (ids: string[]) => Promise<void>;
  handleRename: (id: string, newTitle: string) => Promise<void>;
  toggleSelectDocument: (id: string) => void;
  selectedDocuments: string[];
};

export default function KanbanColumn({
  column,
  documents,
  handleDelete,
  handleRename,
  toggleSelectDocument,
  selectedDocuments,
}: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-72">
      <h2 className="font-semibold mb-2">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-card p-2 rounded-md min-h-[200px]"
          >
            {documents.map((doc, index) => {
              // Ensure the id is always a string
              const draggableId = String(doc.id);
              return (
                <Draggable key={draggableId} draggableId={draggableId} index={index}>
                  {(provided) => (
                    <KanbanCard
                      key={draggableId}
                      document={doc}
                      provided={provided}
                      handleDelete={handleDelete}
                      handleRename={handleRename}
                      toggleSelectDocument={toggleSelectDocument}
                      isSelected={selectedDocuments.includes(draggableId)}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}