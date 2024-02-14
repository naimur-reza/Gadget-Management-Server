import { verify } from "jsonwebtoken";
import config from "../config/config";

export const verifyToken = (token: string) => {
  return verify(token, config.jwt_secret!);
};
