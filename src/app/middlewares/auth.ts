import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { GenericError } from "../errors/GenericError";
import { verifyToken } from "../utils/VerifyToken";
import { JwtPayload } from "jsonwebtoken";
import { userModel } from "../modules/User/user.model";

// type TRoles = {
//   role: string;
// }[];

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new GenericError(401, "Unauthorized access!");

    const decoded = verifyToken(token);

    if (!decoded) throw new GenericError(401, "Unauthorized access!");

    const { email } = decoded as JwtPayload;

    const user = userModel.findOne({ email });

    if (!user) throw new GenericError(401, "Unauthorized access!");

    // if (requiredRoles.length && !requiredRoles.includes(role))
    //   throw new GenericError(401, "Unauthorized access!");

    req.user = user;
    next();
  });
};
