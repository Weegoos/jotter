import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/noteSwagger.js';
import {
  getAllNotesByFileID,
  getAllNotesByType,
  getNoteByID,
  searchNotes,
} from '../controllers/note/getNoteControllers.js';
import { pinNote, updateNote } from '../controllers/note/putNoteControllers.js';
import { deleteNoteById } from '../controllers/note/deleteNoteControllers.js';
import { createNote } from '../controllers/note/postNoteControllers.js';
const router = express.Router();

router.get('/:fileId/search', authMiddleware, searchNotes);
router.get('/note/:noteId', authMiddleware, getNoteByID);
router.get('/:fileId/:pinned', authMiddleware, getAllNotesByFileID);
router.get('/:type', authMiddleware, getAllNotesByType);

router.put('/update/:noteId', authMiddleware, updateNote);
router.put('/:noteId/pin', authMiddleware, pinNote);

router.post('/create', authMiddleware, createNote);

router.delete('/:noteId', authMiddleware, deleteNoteById);
export default router;
