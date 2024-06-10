import sinon from "sinon";
import Rating from "../../src/models/Rating.js";
import Cart from "../../src/models/Cart.js";

export const fakeRatingFindAll = () => {
  return sinon.stub(Rating, "find").resolves([]);
};

export const fakeCartFindAll = () => {
  return sinon.stub(Cart, "find").resolves([]);
};
