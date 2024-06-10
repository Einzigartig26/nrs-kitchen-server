import bodyParser from "body-parser";
import express from "express";

import { addRating } from "../controllers/RatingController.js";

const ratingRouter = express.Router();

ratingRouter.post("/add_rating", bodyParser.json(), addRating);

export default ratingRouter;
