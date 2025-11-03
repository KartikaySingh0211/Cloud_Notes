"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.editNote = exports.addNote = exports.getNotes = void 0;
const NoteModel = __importStar(require("../models/noteModel"));
const getNotes = async (_req, res) => {
    const notes = await NoteModel.getAllNotes();
    res.json(notes);
};
exports.getNotes = getNotes;
const addNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content)
        return res.status(400).json({ error: "Title and content required" });
    const note = await NoteModel.createNote({ title, content });
    res.status(201).json(note);
};
exports.addNote = addNote;
const editNote = async (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const note = await NoteModel.updateNote(id, { title, content });
    res.json(note);
};
exports.editNote = editNote;
const removeNote = async (req, res) => {
    const id = Number(req.params.id);
    const result = await NoteModel.deleteNote(id);
    res.json(result);
};
exports.removeNote = removeNote;
