import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getAllAccessLevelTypes,
  getAllContentTypes,
  getAllGeneralTypes,
  getAllTypes,
  getAllTypeUsedByUser,
} from "../controllers/typesControllers.js";
import "./swagger/typesSwagger.js";
const router = express.Router();

router.get("", authMiddleware, getAllTypes);

router.get("/usedByUser/:fileId", getAllTypeUsedByUser);

router.get("/general", authMiddleware, getAllGeneralTypes);
router.get("/content", authMiddleware, getAllContentTypes);
router.get("/accessLevel", authMiddleware, getAllAccessLevelTypes);
export default router;
