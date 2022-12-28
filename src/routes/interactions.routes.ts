import { Router } from "express";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const interactionRoutes = Router();

interactionRoutes.post("/like/:id", ensureAuthMiddleware);

export default interactionRoutes;
