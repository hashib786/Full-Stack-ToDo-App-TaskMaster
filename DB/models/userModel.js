import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (ele) {
          return ele.includes("@");
        },
      },
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
      minlength: 8,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
