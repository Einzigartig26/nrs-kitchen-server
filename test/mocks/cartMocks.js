import Cart from "../../src/models/Cart.js";
import sinon from "sinon";
import Meal from "../../src/models/Meal.js";

export const fakeFindOneAndUpdate = () => {
  return sinon.stub(Cart, "findOneAndUpdate").resolves([
    {
      _id: "63f4aec65dd48ba2266e53cb",
      mealQuantity: 1,
      __v: 0,
    },
  ]);
};

export const fakeFindPositive = () => {
  return sinon.stub(Cart, "find").resolves([
    {
      _id: "63f4aec65dd48ba2266e53cb",
      mealQuantity: 10,
      __v: 0,
    },
  ]);
};

export const fakeMealFind = () => {
  return sinon.stub(Meal, "find").resolves([
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
};

export const fakeFindAllCartMeal = () => {
  return sinon.stub(Cart, "find").resolves([
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
};

export const fakeCartAggregate = () => {
  return sinon.stub(Cart, "aggregate").resolves([
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
};

export const fakeDeleteMealFromCart = () => {
  return sinon
    .stub(Cart, "deleteOne")
    .resolves({ message: "Meal deleted successfully" });
};
