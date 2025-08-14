import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import superheroRoutes from "./routes/superhero.routes.js";
import {db} from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/superheroes", superheroRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

db()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
