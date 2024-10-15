import React, { useState, useEffect } from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

function Notes({ notes = [], onEdit, onDelete }) {
  const [allPublicNotes, setAllPublicNotes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const publicNotes = users.flatMap(user => {
      const userNotes = JSON.parse(localStorage.getItem(`notes_${user.username}`)) || [];
      return userNotes.filter(note => note.isPublic).map(note => ({...note, username: user.username}));
    });
    setAllPublicNotes(publicNotes);
  }, [notes]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      toast.success('Note deleted successfully');
      setDeleteId(null);
    }
  };

  const NoNotesMessage = () => (
    <div className="col-span-3 flex flex-col items-center justify-center">
      {/* <img src="/path/to/no-notes-image.png" alt="No notes available" className="w-64 h-64 mb-4" /> */}
      <p className="text-xl font-semibold text-gray-600">No notes available. Why don't you add one!</p>
    </div>
  );

  return (
    <div className="px-10">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="grid grid-cols-3 gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="bg-yellow-100 p-4 rounded shadow flex flex-col h-full relative group">
              <h3 className="font-bold mb-2 break-words">{note.title}</h3>
              <p className="break-words mb-5">{note.content}</p>
              <p className="mt-auto text-sm text-gray-600">{note.isPublic ? 'Public' : 'Private'}</p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(note.id)} className="mr-4 transition-transform hover:scale-150">
                  <MdEdit/>
                </button>
                <button onClick={() => handleDelete(note.id)} className="transition-transform hover:scale-150">
                  <RiDeleteBin6Line/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <NoNotesMessage />
        )}
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Public Notes</h2>
      <div className="grid grid-cols-3 gap-4">
        {allPublicNotes.length > 0 ? (
          allPublicNotes.map((note) => (
            <div key={note.id} className="bg-green-100 p-4 rounded shadow flex flex-col h-full">
              <h3 className="font-bold mb-2 break-words">{note.title}</h3>
              <p className="break-words mb-5">{note.content}</p>
              <p className="mt-auto text-sm text-gray-600">By: {note.username}</p>
            </div>
          ))
        ) : (
          <NoNotesMessage />
        )}
      </div>
      
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this note?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded mr-4">
                Yes
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notes
