import express from "express";
import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superhero.controller.js";

const router = express.Router();

router.get("/", getSuperheroes);
router.get("/:id", getSuperheroById);
router.post("/", createSuperhero);
router.put("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);

export default router;