import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/noteSwagger.js';
import {
  getAllNotesByType,
  getNoteByID,
  GetNotesByFileIdController,
  searchNotes,
} from '../controllers/note/getNoteControllers.js';
import { pinNote, updateNote } from '../controllers/note/putNoteControllers.js';
import { deleteNoteById } from '../controllers/note/deleteNoteControllers.js';
import { CreateNotesController } from '../controllers/note/postNoteControllers.js';
import { CreateNote, GetNote } from '../../use-cases/Note/CreateNote.js';
import Notes from '../../infrastructure/database/models/notesSchemas.js';
import { PostRepository } from '../repositories/postRepositories.js';
const router = express.Router();

router.put('/update/:noteId', authMiddleware, updateNote);
router.put('/:noteId/pin', authMiddleware, pinNote);

// DI Solid
const postNoteRepository = new PostRepository(Notes);
const createNoteUseCase = new CreateNote(postNoteRepository);
const createNotesController = new CreateNotesController(createNoteUseCase);
router.post('/create', authMiddleware, createNotesController.create.bind(createNotesController));

router.get('/:fileId/search', authMiddleware, searchNotes);
router.get('/note/:noteId', authMiddleware, getNoteByID);

const getNoteUseCase = new GetNote(postNoteRepository);
const getNotesController = new GetNotesByFileIdController(getNoteUseCase);
router.get('/:fileId/:pinned', authMiddleware, getNotesController.handle.bind(getNotesController));
router.get('/:type', authMiddleware, getAllNotesByType);

router.delete('/:noteId', authMiddleware, deleteNoteById);
export default router;
