import Cart from "../models/Cart.js";
import Meal from "../models/Meal.js";

export const findAllCartMeals = (req, res, next) => {
  Cart.aggregate([
    {
      $lookup: {
        from: "meals",
        localField: "_id",
        foreignField: "_id",
        as: "meal",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $arrayElemAt: ["$$ROOT.meal", 0],
            },
            { mealQuantity: "$mealQuantity" },
          ],
        },
      },
    },
    {
      $project: {
        mealDescription: 0,
      },
    },
  ])
    .then((result) => {
      res.send(result);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const totalMealInCart = (req, res, next) => {
  Cart.find({}, { mealQuantity: 1 })
    .then((result) => {
      let count = 0;
      result.map((item) => {
        count = count + item.mealQuantity;
      });
      res.send({ cartMealCount: count });
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addToCart = (req, res, next) => {
  Cart.find({ _id: req.body.mealId })
    .then((result) => {
      if (Boolean(result.length)) {
        Cart.findOneAndUpdate(
          { _id: req.body.mealId },
          { mealQuantity: 1 + result[0].mealQuantity }
        )
          .then((result) => {
            res.send({ message: "Meal added successfully" });
            res.end();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Cart({
          _id: req.body.mealId,
          mealQuantity: 1,
        })
          .save()
          .then((result) => {
            res.send({ message: "Meal added successfully" });
            res.end();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const decreaseQuantity = (req, res, next) => {
  Cart.find({ _id: req.body.mealId }).then((result) => {
    if (result[0].mealQuantity === 1) {
      Cart.findOneAndDelete({ _id: req.body.mealId }).then((result) => {
        res.send({ message: "Meal count decreased successfully" });
        res.end();
      });
    } else {
      Cart.findOneAndUpdate(
        {
          _id: req.body.mealId,
        },
        { mealQuantity: result[0].mealQuantity - 1 }
      )
        .then((result) => {
          res.send({ message: "Meal count decreased successfully" });
          res.end();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

export const deleteFromCart = (req, res, next) => {
  Cart.deleteOne({ _id: req.body.mealId })
    .then((result) => {
      res.send({ message: "Meal deleted successfully" });
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGrandTotal = async (req, res, next) => {
  var grandTotal = 0;
  const cartMeals = await Cart.find()
    .then((CartResult) => {
      return CartResult;
    })
    .catch((err) => {
      console.log(err);
    });

  const meals = await Meal.find({ _id: { $in: cartMeals } })
    .then((mealResult) => {
      return mealResult;
    })
    .catch((err) => {
      console.log(err);
    });

  meals.map((meal) => {
    cartMeals.forEach((cart) => {
      if (cart._id.toString() === meal._id.toString()) {
        grandTotal = grandTotal + meal.mealPrice * cart.mealQuantity;
      }
    });
  });
  res.send({ grandTotal: grandTotal });
  res.end();
};
