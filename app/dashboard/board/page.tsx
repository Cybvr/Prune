import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';

type Task = {
  id: string;
  title: string;
  status: 'Backlog' | 'Planned' | 'In Progress' | 'Completed' | 'Canceled';
  priority: 'No Priority' | 'Low' | 'Medium' | 'High' | 'Urgent';
  favorite: boolean;
  start_date: Date | null;
  end_date: Date | null;
};

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
    const q = query(collection(db, 'documents'), where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    const fetchedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    setTasks(fetchedTasks);
    setLoading(false);
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    const taskRef = doc(db, 'documents', draggableId);
    await updateDoc(taskRef, {
      status: destination.droppableId
    });

    setTasks(updatedTasks);
  };

  const renderColumn = (status: Task['status']) => (
    <Droppable droppableId={status}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
          <h2>{status}</h2>
          {tasks.filter(task => task.status === status).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="kanban-task"
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

  if (loading) return <p>Loading...</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {renderColumn('Backlog')}
        {renderColumn('Planned')}
        {renderColumn('In Progress')}
        {renderColumn('Completed')}
        {renderColumn('Canceled')}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;