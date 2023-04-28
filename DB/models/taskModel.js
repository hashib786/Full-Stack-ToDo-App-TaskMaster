import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Task Must Have Titile"],
      minlength: 5,
    },
    description: {
      type: String,
      required: [true, "A Task Must Have Description"],
      minlength: 15,
    },
    targetDate: {
      type: Date,
      required: [true, "A Task Must Have Targeted Date"],
    },
    catagory: {
      type: String,
      enum: ["general", "education", "urgent", "office"],
      default: "general",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Task Must Be Belong The User"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
