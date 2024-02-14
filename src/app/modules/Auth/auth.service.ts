import CreateToken from "../../utils/CreateToken";
import { IUser } from "../User/user.interface";
import { userModel } from "../User/user.model";
import bcrypt from "bcrypt";

const registerUser = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const user = await userModel.create(userData);

  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = CreateToken(payload);
  return {
    user: {
      ...user,
      password: undefined,
    },
    token,
  };
};

const loginUser = async (userData: IUser) => {
  const user = await userModel.findOne({ email: userData.email }).lean();

  if (!user) {
    throw new Error("User not found!");
  }
  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = CreateToken(payload);

  return {
    user: {
      ...user,
      password: undefined,
    },
    token,
  };
};

export const authServices = {
  registerUser,
  loginUser,
};
