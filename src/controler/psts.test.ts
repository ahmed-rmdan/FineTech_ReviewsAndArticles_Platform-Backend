import  app  from "..";
import request from "supertest";

describe("psts controller tests", () => {
  test("get sliders", async () => {
    const res = await request(app).get('/posts/getsliderposts');
    expect(res.status).toBe(200);
  });
});