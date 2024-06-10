import Cart from "../models/Cart.js";
import Meal from "../models/Meal.js";
import Rating from "../models/Rating.js";

export const addMeal = (req, res, next) => {
  const meals = new Meal({
    mealName: req.body.mealName,
    mealDescription: req.body.mealDescription,
    mealPrice: req.body.mealPrice,
  });
  res.send(req.body);

  meals
    .save()
    .then((result) => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const findAllMeals = async (req, res, next) => {
  var meals = await Meal.find()
    .then((mealResult) => {
      return mealResult;
    })
    .catch((err) => {
      console.log(err);
    });

  var carts = await Cart.find({ _id: { $in: meals } })
    .then((cartResult) => {
      return cartResult;
    })
    .catch((err) => {
      console.log(err);
    });

  meals.map(async (meal, index) => {
    let ratingObj;
    let quantityObj;

    await carts.forEach((element) => {
      if (meal._id.toString() === element._id.toString()) {
        quantityObj = {
          ...meals[index]._doc,
          mealQuantity: element.mealQuantity,
        };
        meals[index] = quantityObj;
      }
    });
    const ratings = await Rating.find({ mealId: meal._id })
      .then((ratingResult) => {
        return ratingResult;
      })
      .catch((err) => {
        console.log(err);
      });

    if (ratings.length) {
      let averageRating = 0;
      await ratings.map((rating) => {
        averageRating = averageRating + rating.mealRating;
      });
      ratingObj = {
        ...meals[index],
        mealRating: averageRating / ratings.length,
      };
      meals[index] = ratingObj;
    }
  });
  res.send(meals);
  res.end();
};
