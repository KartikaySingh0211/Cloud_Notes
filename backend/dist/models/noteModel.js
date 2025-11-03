"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getAllNotes = void 0;
const db_1 = require("../db");
const getAllNotes = async () => {
    const db = await (0, db_1.initDB)();
    return db.all("SELECT * FROM notes ORDER BY created_at DESC");
};
exports.getAllNotes = getAllNotes;
const createNote = async (note) => {
    const db = await (0, db_1.initDB)();
    const result = await db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [note.title, note.content]);
    return { id: result.lastID, ...note };
};
exports.createNote = createNote;
const updateNote = async (id, note) => {
    const db = await (0, db_1.initDB)();
    await db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
        note.title,
        note.content,
        id,
    ]);
    return { id, ...note };
};
exports.updateNote = updateNote;
const deleteNote = async (id) => {
    const db = await (0, db_1.initDB)();
    await db.run("DELETE FROM notes WHERE id = ?", [id]);
    return { message: "Deleted successfully" };
};
exports.deleteNote = deleteNote;
