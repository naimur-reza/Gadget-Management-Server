/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.registerUser(req.body);
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: result,
      },
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginUser(req.body);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: result,
      },
    });
  },
);

export const authController = {
  registerUser,
  loginUser,
};
