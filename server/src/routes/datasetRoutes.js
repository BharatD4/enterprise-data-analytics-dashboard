import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadDataset,
  getDatasets,
  deleteDataset,
} from "../controllers/datasetController.js";
const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadDataset
);
router.get("/", authMiddleware, getDatasets);
router.delete(
  "/:id",
  authMiddleware,
  deleteDataset
);

export default router;