import { Router } from "express";
import {
  createSessionController,
  logoutSessionController,
  refreshSessionController,
} from "../controllers/sessions.controller";

const sessionRoutes = Router();

sessionRoutes.post("/login", createSessionController);
sessionRoutes.post("/logout", logoutSessionController);
sessionRoutes.post("/refresh", refreshSessionController);

export default sessionRoutes;
