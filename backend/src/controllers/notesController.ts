import { Request, Response } from "express";
import * as NoteModel from "../models/noteModel";

export const getNotes = async (_req: Request, res: Response) => {
	const notes = await NoteModel.getAllNotes();
	res.json(notes);
};

export const addNote = async (req: Request, res: Response) => {
	const { title, content } = req.body;
	if (!title || !content)
		return res.status(400).json({ error: "Title and content required" });
	const note = await NoteModel.createNote({ title, content });
	res.status(201).json(note);
};

export const editNote = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { title, content } = req.body;
	const note = await NoteModel.updateNote(id, { title, content });
	res.json(note);
};

export const removeNote = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const result = await NoteModel.deleteNote(id);
	res.json(result);
};
