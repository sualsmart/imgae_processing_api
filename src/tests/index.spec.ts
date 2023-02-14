import app from "../../src/app";
//import routes from './routes/index';
import supertest from "supertest";
import { imageProcessing } from "../ImageProcessing";

describe("Testing the image processing function", function () {
  it("No, errors, it returned the path", async function () {
    // status code should be 404 `not found`
    expect(async () => {
      await imageProcessing("img", 200, 300);
    }).not.toThrow();
  });
});
describe("Testing the home page endpoint", function () {
  it("returns 200", async function () {
    // status code should be 200 `OK`
    await supertest(app).get("/").expect(200);
  });
});
describe("Testing the image processing endpoint", function () {
  it("returns 200", async function () {
    // status code should be 200 `OK`
    await supertest(app)
      .get("/api?filename=img&height=50&width=50")
      .expect(200);
  });
});
describe("Testing the image processing when the name of the image is not found ", function () {
  it("returns 404", async function () {
    // status code should be 400 `bad request`
    await supertest(app)
      .get("/api?filename=imgg&height=a0&width=a50")
      .expect(404);
  });
});
describe("Testing the image processing when all parameters are null", function () {
  it("returns 404", async function () {
    // status code should be 404 `not found`
    await supertest(app).get("/api?filename=&height=&width=").expect(404);
  });
});
