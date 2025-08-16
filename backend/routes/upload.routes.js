import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadSingleFile, uploadMultipleFiles } from "../controllers/upload.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/single", upload.single("file"), asyncHandler(uploadSingleFile));
router.post("/multiple", upload.array("files", 5), asyncHandler(uploadMultipleFiles));

export default router;
