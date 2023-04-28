import mongoose from "mongoose";

// repleace user placeholder to real user id and also password
const DB = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASS
).replace("<user>", process.env.MONGODB_USER);

// connecting mongo if mongo not connected then connect
const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected DB Successfully");
    } catch (error) {
      console.log("Error 🔥🔥🔥🔥🔥🔥🔥🔥🔥", error);
    }
  } else console.log("Already DB Connected");
};

export default connectMongo;
