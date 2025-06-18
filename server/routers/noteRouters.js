import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/noteSwagger.js";
import { getAllNotesByFileID, getAllPublicNotes, getNoteByID } from "../controllers/note/getNoteControllers.js";
import { updateNote } from "../controllers/note/putNoteControllers.js";
const router = express.Router();

router.get('/public', authMiddleware, getAllPublicNotes);
router.get("/:fileId", authMiddleware, getAllNotesByFileID);
router.get("/note/:noteId", authMiddleware, getNoteByID);

router.put("/update/:noteId", updateNote);

// router.post("/create", authMiddleware, createNote);

// router.delete('/:noteId', authMiddleware ,deleteNoteById)
export default router;
