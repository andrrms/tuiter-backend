import { Router } from "express";

import {
  createFollowController,
  listFollowersController,
  listFollowingController,
  removeFollowController,
} from "../controllers/follows.controller";
import {
  createUserController,
  defineAvatarController,
  retrieveAvatarController,
  retrieveSelfController,
  retrieveUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import uploads from "../uploads";

const userRoutes = Router();

userRoutes.post("/register", createUserController);
userRoutes.post(
  "/avatar",
  ensureAuthMiddleware,
  uploads.single("avatar"),
  defineAvatarController
);
userRoutes.get("/avatar/:filename", retrieveAvatarController);
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
userRoutes.get("/me", ensureAuthMiddleware, retrieveSelfController);
userRoutes.get("/:keyword", ensureAuthMiddleware, retrieveUserController);

export default userRoutes;
