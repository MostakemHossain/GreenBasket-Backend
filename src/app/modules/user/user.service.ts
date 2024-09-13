import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const userService = {
  createUser,
};
