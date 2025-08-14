import Superhero from "../models/superhero.model.js";

// GET /api/superheroes
// Возвращает список для главной страницы: nickname + logo
export const getSuperheroes = async (req, res) => {
  try {
    const heroes = await Superhero.find().select("nickname logo").lean();
    return res.json(heroes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
};

export const getSuperheroById = async (req, res) => {
  try {
    const hero = await Superhero.findById(req.params.id).lean();
    if (!hero) {
      return res.status(404).json({message: "Superhero not found"});
    }
    return res.json(hero);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
};

export const createSuperhero = async (req, res) => {
  try {
    const {nickname, realName} = req.body;
    if (!nickname || !realName) {
      return res.status(400).json({message: "nickname and realName are required"});
    }
    const hero = new Superhero(req.body);
    await hero.save();
    return res.status(201).json(hero);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "Failed to create superhero",
      error: err.message
    });
  }
};

export const updateSuperhero = async (req, res) => {
  try {
    const updates = req.body;
    const hero = await Superhero.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!hero) {
      return res.status(404).json({message: "Superhero not found"});
    }
    return res.json(hero);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "Failed to update superhero",
      error: err.message
    });
  }
};

export const deleteSuperhero = async (req, res) => {
  try {
    const hero = await Superhero.findByIdAndDelete(req.params.id);
    if (!hero) {
      return res.status(404).json({message: "Superhero not found"});
    }
    return res.json({message: "Superhero deleted successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
};
