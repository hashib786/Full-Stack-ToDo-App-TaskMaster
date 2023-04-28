import connectMongo from "@/DB/connectDB";
import User from "@/DB/models/userModel";
import { hashPass } from "@/utils/bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") return;
  try {
    const { name, email, password } = req.body;
    const hashPassword = await hashPass(password);
    await connectMongo();
    const obj = { name, email, password: hashPassword };
    const newUser = await User.create(obj);
    res.status(200).json({ status: "success", newUser });
  } catch (error) {
    res.status(401).json({ status: "fail", message: error });
  }
};

export default handler;
