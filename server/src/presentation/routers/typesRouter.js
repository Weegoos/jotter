import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import './swagger/typesSwagger.js';
import { GetTypeController } from '../controllers/types/typesGetControllers.js';
import { TypeRepository } from '../../infrastructure/repositories/TypeRepositories.js';
import Types from '../../infrastructure/database/models/typeSchemas.js';
import { TypeUseCases } from '../../use-cases/Types/TypesUseCases.js';
import Notes from '../../infrastructure/database/models/notesSchemas.js';
const router = express.Router();

// DI Solid
// get
const typeRepository = new TypeRepository(Types, Notes);
const typeUseCase = new TypeUseCases(typeRepository);
const getTypeController = new GetTypeController(typeUseCase);
router.get('', authMiddleware, getTypeController.getAllTypes.bind(getTypeController));
router.get(
  '/:fileId/note-types/used',
  getTypeController.getAllTypeUsedByUser.bind(getTypeController)
);
router.get(
  '/description',
  authMiddleware,
  getTypeController.getTypesByDescription.bind(getTypeController)
);
export default router;
