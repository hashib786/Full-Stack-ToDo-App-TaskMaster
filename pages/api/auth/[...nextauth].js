import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectMongo from "@/DB/connectDB";
import User from "@/DB/models/userModel";
import { verify } from "@/utils/bcrypt";

const throwError = (message) => {
  throw new Error(message);
};

const authOptions = {
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credential, req) {
        const { email, password } = credential;
        await connectMongo();

        const logUser = (
          await User.find({ email }).select("+password -__v")
        )[0];
        if (!logUser) throwError("please Provide Write Email or Password");

        const isVerify = await verify(password, logUser.password);
        if (!isVerify) throwError("please Provide Write Email or Password");

        return {
          email: logUser.email,
          name: {
            name: logUser.name,
            id: logUser._id,
          },
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
