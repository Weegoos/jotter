import express from "express";
import { createNote, deleteNoteById, getAllNotesByFileID, getAllPrivateNotes, getAllPublicNotes, getNoteByID, updateNote } from "../controllers/notes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/noteSwagger.js";
const router = express.Router();

router.get("/:fileId", authMiddleware, getAllNotesByFileID);
router.get("/note/:noteId", authMiddleware, getNoteByID);
router.get('/private/:fileId/', authMiddleware, getAllPrivateNotes)
router.get('/public/:fileId/', authMiddleware, getAllPublicNotes)

router.put("/update/:noteId", updateNote);

router.post("/create", authMiddleware, createNote);

router.delete('/:noteId', authMiddleware ,deleteNoteById)
export default router;
