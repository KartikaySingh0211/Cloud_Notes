import axios from "axios";
import type { Note } from "../types/Note";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // should end with /api
});

export const getNotes = () => API.get<Note[]>("/notes");
export const createNote = (note: Note) => API.post("/notes", note);
export const updateNote = (id: number, note: Note) =>
	API.put(`/notes/${id}`, note);
export const deleteNote = (id: number) => API.delete(`/notes/${id}`);
