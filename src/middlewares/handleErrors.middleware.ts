import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `[APP] Ocorreu o seguinte erro em uma das requisições:\n`,
    error
  );
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "An internal error occured",
    error: process.env.NODE_ENV === "dev" ? error.message : undefined,
  });
};

export { handleErrorMiddleware };
