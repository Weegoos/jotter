import express  from "express";
import { createNote, getAllNotes } from "../controllers/notes.js";

const router = express.Router();

router.post('/create', createNote)
router.get('/all', getAllNotes)

export default router
