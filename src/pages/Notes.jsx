import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';

const NoteCard = ({ note, onSelect }) => (
  <div className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => onSelect(note)}>
    <h3 className="font-semibold mb-2">{note.title}</h3>
    <p className="text-sm text-gray-600">{note.content.substring(0, 50)}...</p>
  </div>
);

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Fetch notes (simulated)
    setNotes([
      { id: 1, title: "Travel Plans", content: "Planning to visit Bali next month..." },
      { id: 2, title: "Project Ideas", content: "New app concept for digital nomads..." },
      { id: 3, title: "Language Learning", content: "Spanish phrases to practice..." },
    ]);
  }, []);

  return (
    <div className="p-6 flex">
      <div className="w-1/3 pr-6">
        <h1 className="text-2xl font-semibold mb-4">Notes</h1>
        <div className="flex items-center mb-4">
          <div className="relative flex-grow mr-2">
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="w-full pl-8 pr-4 py-2 border rounded-lg"
            />
            <Search size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={20} className="mr-2" /> New Note
          </button>
        </div>
        <div className="space-y-4">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onSelect={setSelectedNote} />
          ))}
        </div>
      </div>
      <div className="w-2/3 bg-white p-6 rounded-lg shadow">
        {selectedNote ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </>
        ) : (
          <p className="text-gray-500">Select a note to view its content</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;