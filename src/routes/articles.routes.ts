import { Router } from "express";
import {
  createArticleController,
  listUserArticlesController,
  listUserFeedController,
} from "../controllers/articles.controllers";
import { createLikeController } from "../controllers/interactions.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import interactionRoutes from "./interactions.routes";

const articleRoutes = Router();

articleRoutes.post("/new", ensureAuthMiddleware, createArticleController);
articleRoutes.get("/feed", ensureAuthMiddleware, listUserFeedController);

articleRoutes.post("/like/:id", ensureAuthMiddleware, createLikeController);

articleRoutes.get("/:keyword", listUserArticlesController);

export default articleRoutes;
