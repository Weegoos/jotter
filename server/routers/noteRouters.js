import express from "express";
import { createNote, deleteNoteById, getAllNotesByFileID, getAllPublicNotes, getNoteByID, updateNote } from "../controllers/notes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/noteSwagger.js";
const router = express.Router();

router.get('/public', authMiddleware, getAllPublicNotes);
router.get("/:fileId", authMiddleware, getAllNotesByFileID);
router.get("/note/:noteId", authMiddleware, getNoteByID);

router.put("/update/:noteId", updateNote);

router.post("/create", authMiddleware, createNote);

router.delete('/:noteId', authMiddleware ,deleteNoteById)
export default router;
