import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { UserAuthorization } from "../interfaces/user.interfaces";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invalidToken = new AppError(
    "User must be logged in to access this feature",
    401
  );

  if (!req.headers.authorization) throw invalidToken;
  const [_, token] = req.headers.authorization.split(" ");
  if (!token) throw invalidToken;

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError("Invalid or expired token", 401);

    req.user = {
      id: decoded.sub,
      username: decoded.username,
      authorizationLevel: decoded.authorizationLevel,
    };

    next();
  });
};

export default ensureAuthMiddleware;
