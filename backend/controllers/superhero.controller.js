import Superhero from "../models/superhero.model.js";
import { deleteFile } from "../utils/file.js";

export const getSuperheroes = async (req, res) => {
  const heroes = await Superhero.find().select("nickname logo").lean();
  res.json(heroes);
};

export const getSuperheroById = async (req, res) => {
  const hero = await Superhero.findById(req.params.id).lean();
  if (!hero) return res.status(404).json({ message: "Superhero not found" });
  res.json(hero);
};

export const createSuperhero = async (req, res) => {
  const uploaded = [];

  try {
    const { nickname, realName } = req.body;
    if (!nickname || !realName) return res.status(400).json({ message: "nickname and realName are required" });

    let logoPath = null;
    let imagePaths = [];

    if (req.files?.logo?.[0]) {
      logoPath = `/uploads/${req.files.logo[0].filename}`;
      uploaded.push(logoPath);
    }

    if (req.files?.images) {
      imagePaths = req.files.images.map(f => `/uploads/${f.filename}`);
      uploaded.push(...imagePaths);
    }

    const hero = new Superhero({
      ...req.body,
      logo: logoPath,
      images: imagePaths,
    });

    await hero.save();
    res.status(201).json(hero);
  } catch (err) {
    await Promise.all(uploaded.map(p => deleteFile(p)));
    throw err;
  }
};

export const updateSuperhero = async (req, res) => {
  const hero = await Superhero.findById(req.params.id);
  if (!hero) return res.status(404).json({ message: "Superhero not found" });

  Object.assign(hero, req.body);

  if (req.files?.logo?.[0]) {
    if (hero.logo) await deleteFile(hero.logo);
    hero.logo = `/uploads/${req.files.logo[0].filename}`;
  }

  if (req.files?.images) {
    const newImgs = req.files.images.map(f => `/uploads/${f.filename}`);
    hero.images.push(...newImgs);
  }

  if (req.body.removedImages) {
    const removed = Array.isArray(req.body.removedImages) ? req.body.removedImages : [req.body.removedImages];
    await Promise.all(removed.map(p => deleteFile(p)));
    hero.images = hero.images.filter(i => !removed.includes(i));
  }

  await hero.save();
  res.json(hero);
};

export const deleteSuperhero = async (req, res) => {
  const hero = await Superhero.findByIdAndDelete(req.params.id);
  if (!hero) return res.status(404).json({ message: "Superhero not found" });

  if (hero.logo) await deleteFile(hero.logo);
  if (hero.images?.length) await Promise.all(hero.images.map(img => deleteFile(img)));

  res.json({ message: "Superhero deleted successfully" });
};