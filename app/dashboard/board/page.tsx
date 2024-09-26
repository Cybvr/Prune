'use client'
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { Task, KanbanColumn } from './types'; // Assume we have Task and KanbanColumn types defined
import { ClipLoader } from 'react-spinners';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTasks(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (uid: string) => {
    setLoading(true);
    const q = query(collection(db, 'tasks'), where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    const fetchedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, 'id'>),
    }));
    setTasks(fetchedTasks);
    setLoading(false);
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    const taskRef = doc(db, 'tasks', draggableId);
    await updateDoc(taskRef, {
      status: destination.droppableId
    });

    setTasks(updatedTasks);
  };

  const renderColumn = (status: KanbanColumn['status']) => (
    <Droppable droppableId={status} key={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-1/5 p-2 m-2 bg-gray-100 rounded-md"
        >
          <h2 className="text-xl font-semibold mb-2">{status}</h2>
          {tasks.filter(task => task.status === status).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="p-2 mb-2 bg-white rounded-md shadow"
                >
                  <h3>{task.title}</h3>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#4F46E5" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <p className="text-sm text-muted-foreground">Manage your tasks with ease</p>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 p-4 border-r border-border overflow-y-auto">
          {/* Add any sidebar content if needed */}
        </aside>
        <section className="w-3/4 p-4 overflow-y-auto bg-card text-card-foreground">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex">
              {renderColumn('Backlog')}
              {renderColumn('Planned')}
              {renderColumn('In Progress')}
              {renderColumn('Completed')}
              {renderColumn('Canceled')}
            </div>
          </DragDropContext>
        </section>
      </main>
    </div>
  );
};

export default KanbanBoard;