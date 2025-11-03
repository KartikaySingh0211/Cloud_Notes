import { useEffect, useState } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NoteList";
import type { Note } from "./types/Note";
import { getNotes, createNote, updateNote, deleteNote } from "./services/api";

export default function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [editingNote, setEditingNote] = useState<Note | null>(null);

	// Load notes from backend
	const loadNotes = async () => {
		try {
			const res = await getNotes();
			setNotes(res.data);
		} catch (err) {
			console.error("Failed to load notes:", err);
		}
	};

	useEffect(() => {
		loadNotes();
	}, []);

	// Save or update a note
	const handleSave = async (note: Note) => {
		try {
			if (note.id) {
				await updateNote(note.id, note);
			} else {
				await createNote(note);
			}
			setEditingNote(null);
			loadNotes(); // refresh notes
		} catch (err) {
			console.error("Failed to save note:", err);
		}
	};

	// Delete note
	const handleDelete = async (id: number) => {
		try {
			await deleteNote(id);
			loadNotes();
		} catch (err) {
			console.error("Failed to delete note:", err);
		}
	};

	return (
		<>
			<Header />
			<div className="container">
				<NoteForm
					onSave={handleSave}
					editingNote={editingNote}
					onCancelEdit={() => setEditingNote(null)}
				/>
				<NotesList
					notes={notes}
					onEdit={setEditingNote}
					onDelete={handleDelete}
				/>
			</div>
		</>
	);
}
