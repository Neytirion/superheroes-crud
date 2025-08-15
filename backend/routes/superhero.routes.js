import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superhero.controller.js";

const router = express.Router();

router.post("/", upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "images", maxCount: 5 }
]), createSuperhero);

router.patch("/:id", upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "images", maxCount: 5 }
]), updateSuperhero);

router.get("/", getSuperheroes);
router.get("/:id", getSuperheroById);
router.delete("/:id", deleteSuperhero);

export default router;
