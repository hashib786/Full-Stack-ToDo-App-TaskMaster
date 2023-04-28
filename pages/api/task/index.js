import { getServerSession } from "next-auth";

import connectMongo from "@/DB/connectDB";
import Task from "@/DB/models/taskModel";
import User from "@/DB/models/userModel";
import { authOptions } from "../auth/[...nextauth]";

const badRequest = (res, error, statusCode = 401, message) => {
  res.status(statusCode).json({
    status: "fail",
    message,
    error,
  });
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        badRequest(res, _, 403, "You are not authenticate Please Log In");
      }
      await connectMongo();
      const newTask = await Task.create({
        ...req.body,
        user: session.user.name.id,
      });
      res.status(200).json({
        status: "success",
        newTask,
      });
    } catch (error) {
      badRequest(res, error, 401, "Something Went Wrong When i create Task");
    }
  }
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        badRequest(res, _, 403, "You are not authenticate Please Log In");
      }
      const useremail = session.user.email;
      await connectMongo();
      const allTask = await User.find({ email: useremail }).populate("tasks");
      res.status(200).json({
        status: "success",
        allTask: allTask[0].tasks,
      });
    } catch (error) {
      badRequest(res, error, 401, "Something Went Wrong When i Fetching Task");
    }
  }
};

export default handler;
