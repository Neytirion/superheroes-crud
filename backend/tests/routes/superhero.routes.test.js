import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import superheroRoutes from "../../routes/superhero.routes.js";
import Superhero from "../../models/superhero.model.js";

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use("/api/superheroes", superheroRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // очищаем коллекцию после каждого теста
  await Superhero.deleteMany({});
});

describe("Superhero Routes (Integration)", () => {
  it("GET /api/superheroes should return empty array initially", async () => {
    const res = await request(app).get("/api/superheroes");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/superheroes should create a superhero", async () => {
    const heroData = { nickname: "Ironman", realName: "Tony Stark" };
    const res = await request(app)
      .post("/api/superheroes")
      .send(heroData);

    expect(res.status).toBe(201);
    expect(res.body.nickname).toBe("Ironman");
    expect(res.body.realName).toBe("Tony Stark");

    // Проверяем, что реально сохранилось в БД
    const heroInDb = await Superhero.findOne({ nickname: "Ironman" });
    expect(heroInDb).not.toBeNull();
  });

  it("GET /api/superheroes/:id should return superhero by ID", async () => {
    const hero = await Superhero.create({ nickname: "Thor", realName: "Thor Odinson" });
    const res = await request(app).get(`/api/superheroes/${hero._id}`);

    expect(res.status).toBe(200);
    expect(res.body.nickname).toBe("Thor");
  });

  it("DELETE /api/superheroes/:id should delete superhero", async () => {
    const hero = await Superhero.create({ nickname: "Hulk", realName: "Bruce Banner" });
    const res = await request(app).delete(`/api/superheroes/${hero._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Superhero deleted successfully");

    const heroInDb = await Superhero.findById(hero._id);
    expect(heroInDb).toBeNull();
  });

  it("GET /api/superheroes/:id should return 404 if not found", async () => {
    const res = await request(app).get("/api/superheroes/64f000000000000000000000"); // случайный ObjectId
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Superhero not found");
  });
});
