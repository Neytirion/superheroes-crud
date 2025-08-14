import express from "express";
import multer from "multer";
import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superhero.controller.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.single("logo"), createSuperhero);
router.patch("/:id", upload.array("images", 5), updateSuperhero);
router.get("/", getSuperheroes);
router.get("/:id", getSuperheroById);
router.delete("/:id", deleteSuperhero);

export default router;
