import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadSingleFile, uploadMultipleFiles } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/single", upload.single("file"), uploadSingleFile);
router.post("/multiple", upload.array("files", 5), uploadMultipleFiles);

export default router;
