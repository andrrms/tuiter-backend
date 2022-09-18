import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/user.interfaces";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const { login, password }: IUserLogin = req.body;
  const token = await createSessionService({ login, password });
  return res.json({ token });
};

export { createSessionController };
