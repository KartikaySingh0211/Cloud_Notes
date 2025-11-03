import type { Note } from "../types/Note";

interface Props {
	notes: Note[];
	onEdit: (note: Note) => void;
	onDelete: (id: number) => void;
}

export default function NotesList({ notes, onEdit, onDelete }: Props) {
	if (notes.length === 0) {
		return <p style={{ textAlign: "center" }}>No notes yet. Add one above!</p>;
	}

	return (
		<div>
			{notes.map((note) => (
				<div className="note-card" key={note.id!}>
					<h3>{note.title}</h3>
					<p>{note.content}</p>
					<div className="note-actions">
						<button onClick={() => onEdit(note)}>Edit</button>
						<button
							style={{ background: "#dc2626" }}
							onClick={() => onDelete(note.id!)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
