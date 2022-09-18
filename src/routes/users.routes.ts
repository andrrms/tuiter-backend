import { Router } from "express";
import {
  createFollowController,
  listFollowersController,
  listFollowingController,
  removeFollowController,
} from "../controllers/follows.controller";
import {
  createUserController,
  retrieveUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.post(
  "/follow/:username",
  ensureAuthMiddleware,
  createFollowController
);
userRoutes.post(
  "/unfollow/:username",
  ensureAuthMiddleware,
  removeFollowController
);
userRoutes.get("/followers", ensureAuthMiddleware, listFollowersController);
userRoutes.get("/following", ensureAuthMiddleware, listFollowingController);
userRoutes.get("/:keyword", ensureAuthMiddleware, retrieveUserController);

export default userRoutes;
