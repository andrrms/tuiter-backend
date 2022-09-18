import "reflect-metadata";
import "express-async-errors";
import express from "express";

import userRoutes from "./routes/users.routes";
import { handleErrorMiddleware } from "./middlewares/handleErrors.middleware";
import sessionRoutes from "./routes/sessions.routes";

const app = express();

// Install early middlewares
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

// Install post middlewares
app.use(handleErrorMiddleware);

export default app;
