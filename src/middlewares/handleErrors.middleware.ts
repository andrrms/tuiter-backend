import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "dev") {
    console.error("[APP] Uma rota levantou o erro abaixo:\n", error);
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "An internal error occured",
    error: process.env.NODE_ENV === "dev" ? error.message : undefined,
    stack: process.env.NODE_ENV === "dev" && error.stack,
  });
};

export { handleErrorMiddleware };
