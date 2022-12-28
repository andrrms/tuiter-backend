import "reflect-metadata";
import "express-async-errors";
import cookieparser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";
import articleRoutes from "./routes/articles.routes";
import { handleErrorMiddleware } from "./middlewares/handleErrors.middleware";

const app = express();

// Install early middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
app.use(cookieparser());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/session", sessionRoutes);
app.use("/post", articleRoutes);

// Install post middlewares
app.use(handleErrorMiddleware);

export default app;
