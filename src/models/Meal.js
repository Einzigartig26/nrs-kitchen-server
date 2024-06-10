import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mealsSchema = new Schema(
  {
    mealName: {
      type: String,
      required: true,
    },
    mealPrice: {
      type: Number,
      required: true,
    },
    mealDescription: {
      type: String,
      required: true,
    },
  },
  { versionKey: null }
);

export default mongoose.model("Meal", mealsSchema);
