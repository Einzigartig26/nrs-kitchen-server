import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    userEmailId: {
      type: String,
      require: true,
    },
    userPassword: {
      type: String,
      require: true,
    },
  },
  { versionKey: null }
);

export default mongoose.model("User", userSchema);
