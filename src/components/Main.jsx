import React, { useState, useEffect, useRef } from 'react'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";

function Main() {
    const [expanded, setExpanded] = useState(false);
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const storedNotes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || []
        setNotes(storedNotes)

        const handleDoubleClick = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setTitle('');
                setContent('');
                setIsPublic(false);
                setExpanded(false);
            }
        };

        document.addEventListener('dblclick', handleDoubleClick);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [navigate])

    const handleSaveNote = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        let updatedNotes;
        if (title.trim() !== '' && content.trim() !== '') {
            if (editingNoteId) {
                // Update existing note
                updatedNotes = notes.map(note =>
                    note.id === editingNoteId ? { ...note, title, content, isPublic } : note
                );
            } else {
                // Add new note
                const newNote = { id: Date.now(), title, content, isPublic };
                updatedNotes = [...notes, newNote];
            }
            setNotes(updatedNotes);
            localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(updatedNotes));
            setTitle('');
            setContent('');
            setIsPublic(false);
            setExpanded(false);
            setEditingNoteId(null);
        }
    }

    const handleEditNote = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setIsPublic(noteToEdit.isPublic);
            setExpanded(true);
            setEditingNoteId(id);
        }
    };

    const handleDeleteNote = (id) => {
        const remainingNotes = notes.filter(note => note.id !== id);
        setNotes(remainingNotes);

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(remainingNotes));
        if (editingNoteId === id) {
            setEditingNoteId(null);
            setTitle('');
            setContent('');
            setExpanded(false);
        }
    };
    
    return (
        <div>
            <div className="flex flex-col items-center py-10">
                <div ref={cardRef} className="bg-white p-4 rounded-lg shadow-md w-1/4 transition-all duration-300 ease-in-out">
                    {!expanded ? (
                        <div className="cursor-pointer group" onClick={() => setExpanded(true)}>
                            <h2 className="text-2xl font-bold text-center flex items-center justify-center">
                                Take Notes 
                                <MdEdit className="ml-2 transition-transform group-hover:animate-bounce" />
                            </h2>
                        </div>
                    ) : (
                        <>
                            <div className="transform transition-transform hover:scale-105">
                                <input
                                    className="w-full p-2 mb-2 focus:outline-none text-xl font-semibold"
                                    placeholder="Title..."
                                    style={{ caretColor: 'black' }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    className="w-full h-40 p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Write your note description here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button 
                                    className={`${isPublic ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-pink-600'} text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${(!title.trim() || !content.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                    onClick={handleSaveNote}
                                    disabled={!title.trim() && !content.trim()}
                                >
                                    Save Note
                                </button>
                            </div>
                            <div className="mt-2 flex items-center">
                                <label className="mr-2">Public:</label>
                                <input
                                    type="checkbox"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-yellow-500"
                                />
                            </div>
                        </>
                    )}
                </div>
                {expanded && (
                    <p className="text-sm text-gray-500 mt-2">
                        Double-click outside to close
                    </p>
                )}
            </div>
            <Notes notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        </div>
    )
}

export default Main
