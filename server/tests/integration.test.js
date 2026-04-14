import request from "supertest";
import app from "../app.js"; // make sure app is exported
import { jest } from "@jest/globals";

jest.setTimeout(20000);

describe("Resume Screening Integration Test", () => {
  let evaluation_id;

  it("should upload resume and return evaluation_id", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("resume", Buffer.from("dummy pdf"), "resume.pdf");

    expect(res.statusCode).toBe(202);
    expect(res.body.evaluation_id).toBeDefined();

    evaluation_id = res.body.evaluation_id;
  });

  it("should return processed result", async () => {
    // wait for worker to process
    await new Promise((r) => setTimeout(r, 5000));

    const res = await request(app).get(`/result/${evaluation_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completed");
    expect(res.body.score).toBeDefined();
    expect(res.body.verdict).toBeDefined();
  });
});