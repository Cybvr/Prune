import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';

const NoteCard = ({ note, onSelect }) => (
  <div className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => onSelect(note)}>
    <h3 className="font-semibold mb-2">{note.title}</h3>
    <p className="text-sm text-gray-600">{note.content.substring(0, 100)}...</p>
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus size={20} className="mr-2" /> New Note
        </button>
      </div>

      <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
        <Search size={20} className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search notes..." 
          className="w-full outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onSelect={setSelectedNote} />
        ))}
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">{selectedNote.title}</h2>
            <p className="mb-4">{selectedNote.content}</p>
            <button 
              onClick={() => setSelectedNote(null)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;