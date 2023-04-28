import { hash, compare } from "bcryptjs";

const hashPass = async (password) => {
  return await hash(password, 14);
};

const verify = async (password, hashPassReal) => {
  return await compare(password, hashPassReal);
};

export { hashPass, verify };
