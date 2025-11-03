import { initDB } from "../db";

export interface Note {
	id?: number;
	title: string;
	content: string;
	created_at?: string;
}

export const getAllNotes = async () => {
	const db = await initDB();
	return db.all("SELECT * FROM notes ORDER BY created_at DESC");
};

export const createNote = async (note: Note) => {
	const db = await initDB();
	const result = await db.run(
		"INSERT INTO notes (title, content) VALUES (?, ?)",
		[note.title, note.content]
	);
	return { id: result.lastID, ...note };
};

export const updateNote = async (id: number, note: Note) => {
	const db = await initDB();
	await db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
		note.title,
		note.content,
		id,
	]);
	return { id, ...note };
};

export const deleteNote = async (id: number) => {
	const db = await initDB();
	await db.run("DELETE FROM notes WHERE id = ?", [id]);
	return { message: "Deleted successfully" };
};
