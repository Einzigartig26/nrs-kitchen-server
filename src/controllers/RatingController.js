import Rating from "../models/Rating.js";

export const addRating = (req, res, next) => {
  if (req.body.mealId && req.body.mealRating && req.body.ratingComment) {
    const ratings = new Rating({
      createdDate: new Date(),
      mealId: req.body.mealId,
      mealRating: req.body.mealRating,
      ratingComment: req.body.ratingComment,
    });
    ratings
      .save()
      .then((result) => {
        res.send("rating added");
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ invalid: true });
    res.end();
  }
};
