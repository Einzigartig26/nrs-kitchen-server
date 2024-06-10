import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    mealQuantity: {
      type: Number,
      required: true,
    },
  },
  { mversionKey: false }
);

export default mongoose.model("Cart", cartSchema);
