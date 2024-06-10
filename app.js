import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import userRouter from "./src/routes/user.js";
import cartRouter from "./src/routes/cart.js";
import mealRouter from "./src/routes/meal.js";
import ratingRouter from "./src/routes/rating.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  session({
    secret: "secret session string",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/nrs_kitchen/user", userRouter);

app.use("/nrs_kitchen/cart", cartRouter);

app.use("/nrs_kitchen/meal", mealRouter);

app.use("/nrs_kitchen/rating", ratingRouter);

app.use("/", (req, res) => {
  res.write("<html>Error Not Found</html>");
  res.end();
});

mongoose
  .connect(
    "mongodb+srv://nikita:Rutvik2317@nrkitchen.x7q8gpt.mongodb.net/FoodApp"
  )
  .then((result) => {
    console.log("Connected");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
