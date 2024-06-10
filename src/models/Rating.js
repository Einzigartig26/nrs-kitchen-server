import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    createdDate: {
      type: String,
      require: true,
    },
    mealId: {
      type: String,
      require: true,
    },
    mealRating: {
      type: Number,
      require: true,
    },
    ratingComent: {
      type: String,
      require: true,
    },
  },
  { versionKey: null }
);

export default mongoose.model("Rating", ratingSchema);
