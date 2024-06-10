import bodyParser from "body-parser";
import express from "express";

import {
  addToCart,
  findAllCartMeals,
  decreaseQuantity,
  deleteFromCart,
  getGrandTotal,
  totalMealInCart,
} from "../controllers/CartController.js";

const cartRouter = express.Router();

// GET methods
cartRouter.get("/find_all_cart_meals", findAllCartMeals);
cartRouter.get("/get_grand_total", getGrandTotal);
cartRouter.get("/get_header_count", totalMealInCart);

// POST methods
cartRouter.post("/add_to_cart", bodyParser.json(), addToCart);

// DELETE methods
cartRouter.delete("/delete_meal_from_cart", bodyParser.json(), deleteFromCart);

// PUT methods
cartRouter.put("/decrease_quantity", bodyParser.json(), decreaseQuantity);

export default cartRouter;
