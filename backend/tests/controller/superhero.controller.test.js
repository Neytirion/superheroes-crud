// tests/superhero.controller.test.js
import request from "supertest";
import express from "express";
import superheroRoutes from "../../routes/superhero.routes.js";
import Superhero from "../../models/superhero.model.js";
import * as fileUtils from "../../utils/file.js";

jest.mock("../../models/superhero.model.js");
jest.mock("../../utils/file.js");

const app = express();
app.use(express.json());
app.use("/api/superheroes", superheroRoutes);

describe("Superhero Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/superheroes", () => {
    it("should return list of superheroes", async () => {
      const heroes = [{ nickname: "Superman", logo: "/uploads/superman.png" }];
      Superhero.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(heroes),
        }),
      });

      const res = await request(app).get("/api/superheroes");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(heroes);
    });
  });

  describe("GET /api/superheroes/:id", () => {
    it("should return superhero by id", async () => {
      const hero = { _id: "1", nickname: "Batman", logo: "/uploads/batman.png" };
      Superhero.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(hero) });

      const res = await request(app).get("/api/superheroes/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(hero);
    });

    it("should return 404 if superhero not found", async () => {
      Superhero.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

      const res = await request(app).get("/api/superheroes/1");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Superhero not found");
    });
  });

  describe("POST /api/superheroes", () => {
    it("should create a new superhero", async () => {
      const heroData = { nickname: "Spiderman", realName: "Peter Parker" };

      // Мокаем конструктор + save
      Superhero.mockImplementation(() => ({
        ...heroData,
        logo: null,
        images: [],
        save: jest.fn().mockResolvedValue({ ...heroData, logo: null, images: [] }),
      }));

      const res = await request(app)
        .post("/api/superheroes")
        .send(heroData);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ ...heroData, logo: null, images: [] });
    });
  });

  describe("DELETE /api/superheroes/:id", () => {
    it("should delete a superhero", async () => {
      const hero = { _id: "1", logo: "/uploads/logo.png", images: ["/uploads/img1.png"] };
      Superhero.findByIdAndDelete.mockResolvedValue(hero);
      fileUtils.deleteFile.mockResolvedValue();

      const res = await request(app).delete("/api/superheroes/1");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Superhero deleted successfully");
      expect(fileUtils.deleteFile).toHaveBeenCalledTimes(2);
    });

    it("should return 404 if superhero not found", async () => {
      Superhero.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete("/api/superheroes/1");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Superhero not found");
    });
  });
});
