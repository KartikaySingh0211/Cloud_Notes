import { Router } from "express";
import {
	getNotes,
	addNote,
	editNote,
	removeNote,
} from "../controllers/notesController";

const router = Router();

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", editNote);
router.delete("/:id", removeNote);

export default router;
