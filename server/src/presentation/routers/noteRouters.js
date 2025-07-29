import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/noteSwagger.js';
import {
  GetAllNotesByTypeController,
  GetNoteByIdController,
  GetNotesByFileIdController,
  SearchNotesController,
} from '../controllers/note/getNoteControllers.js';
import { pinNote, updateNote } from '../controllers/note/putNoteControllers.js';
import { DeleteNoteByIdController } from '../controllers/note/deleteNoteControllers.js';
import { CreateNotesController } from '../controllers/note/postNoteControllers.js';
import { CreateNote, DeleteNote, GetNote } from '../../use-cases/Note/NoteUseCases.js';
import Notes from '../../infrastructure/database/models/notesSchemas.js';
import {
  DeleteRepository,
  GetRepository,
  PostRepository,
} from '../repositories/postRepositories.js';
const router = express.Router();

router.put('/update/:noteId', authMiddleware, updateNote);
router.put('/:noteId/pin', authMiddleware, pinNote);

// DI Solid
const postNoteRepository = new PostRepository(Notes);
const createNoteUseCase = new CreateNote(postNoteRepository);
const createNotesController = new CreateNotesController(createNoteUseCase);
router.post('/create', authMiddleware, createNotesController.create.bind(createNotesController));

// get
const getNoteRepository = new GetRepository(Notes);
const getNoteUseCase = new GetNote(getNoteRepository);

const searchNotesController = new SearchNotesController(getNoteUseCase);
router.get(
  '/:fileId/search',
  authMiddleware,
  searchNotesController.handle.bind(searchNotesController)
);

const getNotesByFileIdController = new GetNotesByFileIdController(getNoteUseCase);
router.get(
  '/:fileId/:pinned',
  authMiddleware,
  getNotesByFileIdController.handle.bind(getNotesByFileIdController)
);

const getNoteByIdController = new GetNoteByIdController(getNoteUseCase);
router.get(
  '/note/:noteId',
  authMiddleware,
  getNoteByIdController.handle.bind(getNoteByIdController)
);

const getAllNotesByTypeController = new GetAllNotesByTypeController(getNoteUseCase);
router.get(
  '/:type',
  authMiddleware,
  getAllNotesByTypeController.handle.bind(getAllNotesByTypeController)
);

// delete
const deleteRepository = new DeleteRepository(Notes);
const deleteNoteUseCase = new DeleteNote(deleteRepository);
const deleteNoteByIdController = new DeleteNoteByIdController(deleteNoteUseCase);

router.delete(
  '/:noteId',
  authMiddleware,
  deleteNoteByIdController.handle.bind(deleteNoteByIdController)
);
export default router;
