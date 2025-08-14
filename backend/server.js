import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import superheroRoutes from "./routes/superhero.routes.js";
import { db } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/superheroes", superheroRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

db()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000} -> http://localhost:5000/`)
    );
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
