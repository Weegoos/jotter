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
  SequelizeNoteRepository,
} from '../../infrastructure/repositories/postRepositories.js';
import Files from '../../infrastructure/database/models/fileSchemas.js';
const router = express.Router();

router.put('/update/:noteId', authMiddleware, updateNote);
router.put('/:noteId/pin', authMiddleware, pinNote);

const noteRepository = new SequelizeNoteRepository(Notes, Files);
// DI Solid

const createNoteUseCase = new CreateNote(noteRepository);
const createNotesController = new CreateNotesController(createNoteUseCase);
router.post('/create', authMiddleware, createNotesController.create.bind(createNotesController));

// get
const getNoteUseCase = new GetNote(noteRepository);

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
const deleteNoteUseCase = new DeleteNote(noteRepository);
const deleteNoteByIdController = new DeleteNoteByIdController(deleteNoteUseCase);

router.delete(
  '/:noteId',
  authMiddleware,
  deleteNoteByIdController.handle.bind(deleteNoteByIdController)
);
export default router;
