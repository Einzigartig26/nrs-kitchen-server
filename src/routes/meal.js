import bodyParser from "body-parser";
import express from "express";

import { addMeal, findAllMeals } from "../controllers/MealController.js";

const mealRouter = express.Router();

// GET methods
mealRouter.get("/find_all_meals", bodyParser.json(), findAllMeals);

// POST methods
mealRouter.post("/add_meal", bodyParser.json(), addMeal);

export default mealRouter;
