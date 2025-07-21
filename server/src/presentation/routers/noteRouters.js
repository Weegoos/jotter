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
import { CreateNotesController } from '../controllers/note/postNoteControllers.js';
import { CreateNote } from '../../use-cases/CreateNote.js';
import { PostRepository } from '../repositories/postRepositories.js';
import Notes from '../../infrastructure/database/models/notesSchemas.js';
const router = express.Router();


router.get('/:fileId/search', authMiddleware, searchNotes);
router.get('/note/:noteId', authMiddleware, getNoteByID);
router.get('/:fileId/:pinned', authMiddleware, getAllNotesByFileID);
router.get('/:type', authMiddleware, getAllNotesByType);

router.put('/update/:noteId', authMiddleware, updateNote);
router.put('/:noteId/pin', authMiddleware, pinNote);

// DI Solid 
const repository = new PostRepository(Notes)
const useCase = new CreateNote(repository)
const createNotesController = new CreateNotesController(useCase);
router.post('/create', authMiddleware, createNotesController.create.bind(createNotesController));

router.delete('/:noteId', authMiddleware, deleteNoteById);
export default router;
