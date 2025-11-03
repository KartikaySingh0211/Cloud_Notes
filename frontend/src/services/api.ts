import axios from "axios";
import type { Note } from "../types/Note";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/notes",
});

export const getNotes = () => API.get<Note[]>("/");
export const createNote = (note: Note) => API.post("/", note);
export const updateNote = (id: number, note: Note) => API.put(`/${id}`, note);
export const deleteNote = (id: number) => API.delete(`/${id}`);
