import { expect } from "chai";
import request from "supertest";
import app from "../../app.js";
import { fakeMealFind } from "../mocks/cartMocks.js";
import { fakeCartFindAll, fakeRatingFindAll } from "../mocks/mealMocks.js";

describe("Meal Routes", () => {
  describe("GET /find_all_meals", () => {
    let fakeMealFindStub;
    let fakeCartFindStub;
    let fakeRatingStub;

    beforeEach(() => {
      fakeMealFindStub = fakeMealFind();
      fakeCartFindStub = fakeCartFindAll();
      fakeRatingStub = fakeRatingFindAll();
    });

    afterEach(() => {
      fakeMealFindStub.restore();
      fakeCartFindStub.restore();
      fakeRatingStub.restore();
    });

    it("Should get all the meal", async () => {
      const response = await request(app).get(
        "/nrs_kitchen/meal/find_all_meals"
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          _id: "63e200772153a6c8f9da1de3",
          mealName: "Burger",
          mealPrice: 100,
          mealDescription: "Very Very Tasty amd cheezy burger",
        },
        {
          _id: "63f4aec65dd48ba2266e53cb",
          mealName: "Gulab Jamun",
          mealPrice: 2,
          mealDescription: "Very Very Tasty Gulab Jamun",
        },
        {
          _id: "63e1ffb11a2d53c3409e33b4",
          mealName: "Pizza",
          mealPrice: 50,
          mealDescription: "Very Very Tasty amd cheezy",
        },
        {
          _id: "662e4bebbff25e98e67b9cca",
          mealName: "French Frise",
          mealPrice: 150,
          mealDescription: "Very Very Tasty Frise",
        },
        {
          _id: "662e50c17b87930509a0d536",
          mealName: "Noodles",
          mealPrice: 70,
          mealDescription: "Good Noodles",
        },
      ]);
    });
  });

  describe("POST /add_meal", () => {
    let fakeMealFindStub;
    let fakeCartFindStub;
    let fakeRatingStub;

    beforeEach(() => {
      fakeMealFindStub = fakeMealFind();
      fakeCartFindStub = fakeCartFindAll();
      fakeRatingStub = fakeRatingFindAll();
    });

    afterEach(() => {
      fakeMealFindStub.restore();
      fakeCartFindStub.restore();
      fakeRatingStub.restore();
    });
  });
});
