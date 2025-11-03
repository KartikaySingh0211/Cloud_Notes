import React, { useEffect, useState } from "react";
import type { Note } from "../types/Note";

interface NoteFormProps {
	onSave: (note: Note) => void;
	editingNote: Note | null;
	onCancelEdit: () => void;
}

export default function NoteForm({
	onSave,
	editingNote,
	onCancelEdit,
}: NoteFormProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// When editingNote changes, populate form fields
	useEffect(() => {
		if (editingNote) {
			setTitle(editingNote.title);
			setContent(editingNote.content);
		} else {
			setTitle("");
			setContent("");
		}
	}, [editingNote]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({ id: editingNote?.id, title, content });
		setTitle("");
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			/>
			<button type="submit">{editingNote ? "Update Note" : "Add Note"}</button>
			{editingNote && (
				<button type="button" onClick={onCancelEdit}>
					Cancel
				</button>
			)}
		</form>
	);
}
