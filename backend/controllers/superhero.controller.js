import fs from "fs";
import path from "path";
import Superhero from "../models/superhero.model.js";

const deleteFile = (filePath) => {
  if (!filePath) return;
  const absolutePath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));
  if (fs.existsSync(absolutePath)) {
    fs.unlink(absolutePath, (err) => {
      if (err) console.error("Failed to delete file:", absolutePath, err);
    });
  }
};

export const getSuperheroes = async (req, res) => {
  try {
    const heroes = await Superhero.find().select("nickname logo").lean();
    return res.json(heroes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSuperheroById = async (req, res) => {
  try {
    const hero = await Superhero.findById(req.params.id).lean();
    if (!hero) {
      return res.status(404).json({ message: "Superhero not found" });
    }
    return res.json(hero);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createSuperhero = async (req, res) => {
  try {
    const { nickname, realName } = req.body;
    if (!nickname || !realName) {
      return res.status(400).json({ message: "nickname and realName are required" });
    }

    let logoPath = null;
    let imagePaths = [];

    if (req.files?.logo?.[0]) {
      logoPath = `/uploads/${req.files.logo[0].filename}`;
    }

    if (req.files?.images) {
      imagePaths = req.files.images.map((file) => `/uploads/${file.filename}`);
    }

    const hero = new Superhero({
      ...req.body,
      logo: logoPath,
      images: imagePaths,
    });

    await hero.save();
    return res.status(201).json(hero);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "Failed to create superhero",
      error: err.message,
    });
  }
};

export const updateSuperhero = async (req, res) => {
  try {
    const hero = await Superhero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Superhero not found" });

    Object.assign(hero, req.body);

    if (req.files?.logo?.[0]) {
      if (hero.logo) {
        deleteFile(hero.logo);
      }
      hero.logo = `/uploads/${req.files.logo[0].filename}`;
    }

    if (req.files?.images) {
      const newImages = req.files.images.map(file => `/uploads/${file.filename}`);
      hero.images.push(...newImages);
    }

    if (req.body.removedImages) {
      const removed = Array.isArray(req.body.removedImages)
        ? req.body.removedImages
        : [req.body.removedImages];

      removed.forEach(img => deleteFile(img));
      hero.images = hero.images.filter(img => !removed.includes(img));
    }

    await hero.save();
    return res.json(hero);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Failed to update superhero", error: err.message });
  }
};

export const deleteSuperhero = async (req, res) => {
  try {
    const hero = await Superhero.findByIdAndDelete(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: "Superhero not found" });
    }
    if (hero.logo) deleteFile(hero.logo);
    if (hero.images?.length) {
      hero.images.forEach(img => deleteFile(img));
    }

    return res.json({ message: "Superhero deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
