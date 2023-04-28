import connectMongo from "@/DB/connectDB";
import Task from "@/DB/models/taskModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const badRequest = (
  error = null,
  res,
  statusCode = 403,
  message = "Something Went Wrong"
) => {
  res.status(statusCode).json({
    status: "fail",
    message,
    error,
  });
};

const handler = async (req, res) => {
  const { taskId } = req.query;
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        badRequest(_, res, _, 403, "You are not authenticate Please Log In");
      }
      await connectMongo();
      const deletTask = await Task.findByIdAndDelete(taskId);
      res.status(202).json({
        status: "success",
        deletTask,
      });
    } catch (error) {
      badRequest(error, res);
    }
  }

  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        badRequest(_, res, _, 403, "You are not authenticate Please Log In");
      }
      await connectMongo();
      const newTask = await Task.findById(taskId);
      res.status(202).json({
        status: "success",
        newTask,
      });
    } catch (error) {
      badRequest(error, res);
    }
  }

  if (req.method === "PATCH") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        badRequest(_, res, _, 403, "You are not authenticate Please Log In");
      }
      await connectMongo();
      const updateTask = await Task.findByIdAndUpdate(taskId, req.body);
      res.status(200).json({
        status: "success",
        updateTask,
      });
    } catch (error) {
      badRequest(error, res);
    }
  }
};

export default handler;
