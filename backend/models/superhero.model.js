import mongoose from "mongoose";

const SuperheroSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true, maxlength: 50 },
  realName: { type: String, required: true, maxlength: 50 },
  originDescription: { type: String },
  superpowers: [{ type: String }],
  catchPhrase: { type: String },
  logo: { type: String },
  images: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Superhero", SuperheroSchema);
