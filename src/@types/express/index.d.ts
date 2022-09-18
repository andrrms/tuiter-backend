import * as express from "express";
import { UserAuthorization } from "../../interfaces/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        authorizationLevel: UserAuthorization | number;
      };
    }
  }
}
