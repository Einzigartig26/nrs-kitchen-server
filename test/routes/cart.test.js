import { expect } from "chai";
import {
  fakeCartAggregate,
  fakeDeleteMealFromCart,
  fakeFindAllCartMeal,
  fakeFindOneAndUpdate,
  fakeFindPositive,
  fakeMealFind,
} from "../mocks/cartMocks.js";
import request from "supertest";
import app from "../../app.js";

describe("Cart Routes", () => {
  describe("POST /add_to_cart", () => {
    let fakeFindOneAndUpdateStub;
    let fakeFindPositiveStub;

    beforeEach(() => {
      fakeFindOneAndUpdateStub = fakeFindOneAndUpdate();
      fakeFindPositiveStub = fakeFindPositive();
    });

    afterEach(() => {
      fakeFindOneAndUpdateStub.restore();
      fakeFindPositiveStub.restore();
    });

    it("Should get all meal in the cart", async () => {
      try {
        const response = await request(app)
          .post("/nrs_kitchen/cart/add_to_cart")
          .send({ mealId: "63f4aec65dd48ba2266e53cb" });

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          message: "Meal added successfully",
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GET /get_grand_total", () => {
    let fakeCartFindStub;
    let fakeMealFindStub;

    beforeEach(() => {
      fakeCartFindStub = fakeFindPositive();
      fakeMealFindStub = fakeMealFind();
    });
    afterEach(() => {
      fakeCartFindStub.restore();
      fakeMealFindStub.restore();
    });

    it("Should get grand total", async () => {
      try {
        const response = await request(app).get(
          "/nrs_kitchen/cart/get_grand_total"
        );

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({ grandTotal: 20 });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GET /find_all_cart_meals", () => {
    let fakeFindAllCartMealsStub;
    let fakeMealFindStub;

    beforeEach(() => {
      fakeFindAllCartMealsStub = fakeCartAggregate();
      fakeMealFindStub = fakeMealFind();
    });
    afterEach(() => {
      fakeFindAllCartMealsStub.restore();
      fakeMealFindStub.restore();
    });

    it("Should get all meals in the cart", async () => {
      try {
        const response = await request(app).get(
          "/nrs_kitchen/cart/find_all_cart_meals"
        );

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal([
          {
            _id: "63f4aec65dd48ba2266e53cb",
            mealName: "Gulab Jamun",
            mealPrice: 2,
            mealQuantity: 12,
          },
          {
            _id: "63e1ffb11a2d53c3409e33b4",
            mealName: "Pizza",
            mealPrice: 50,
            mealQuantity: 6,
          },
          {
            _id: "63e200772153a6c8f9da1de3",
            mealName: "Burger",
            mealPrice: 100,
            mealQuantity: 1,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("DELETE /delete_meal_from_cart", () => {
    let fakeDeleteFromCartStub;

    beforeEach(() => {
      fakeDeleteFromCartStub = fakeDeleteMealFromCart();
    });

    afterEach(() => {
      fakeDeleteFromCartStub.restore();
    });

    it("Should delete the meal", async () => {
      try {
        const response = await request(app)
          .delete("/nrs_kitchen/cart/delete_meal_from_cart")
          .send({
            mealId: "mealId",
          });

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          message: "Meal deleted successfully",
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GET /get_header_count", () => {
    let fakeFindPositiveStub;

    beforeEach(() => {
      fakeFindPositiveStub = fakeFindPositive();
    });

    afterEach(() => {
      fakeFindPositiveStub.restore();
    });

    it("Should get meal count in cart", async () => {
      const response = await request(app).get(
        "/nrs_kitchen/cart/get_header_count"
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ cartMealCount: 10 });
    });
  });

  describe("PUT /decrease_quantity", () => {
    let fakeFindPositiveStub;
    let fakeDeleteFromCartStub;

    beforeEach(() => {
      fakeFindPositiveStub = fakeFindPositive();
      fakeDeleteFromCartStub = fakeDeleteMealFromCart();
    });

    afterEach(() => {
      fakeFindPositiveStub.restore();
      fakeDeleteFromCartStub.restore();
    });
    it("Should decrease meal count in cart", async () => {
      try {
        const response = await request(app).put(
          "/nrs_kitchen/cart/decrease_quantity"
        );
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          message: "Meal count decreased successfully",
        });
      } catch (error) {}
    });
  });
});
