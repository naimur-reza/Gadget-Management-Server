/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      data: err,
    });
  }

  res.status(errStatus).json({
    success: false,
    message: errMsg,
    data: err,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
