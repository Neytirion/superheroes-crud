import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superhero.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  asyncHandler(createSuperhero)
);

router.patch(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  asyncHandler(updateSuperhero)
);

router.get("/", asyncHandler(getSuperheroes));
router.get("/:id", asyncHandler(getSuperheroById));
router.delete("/:id", asyncHandler(deleteSuperhero));

export default router;
