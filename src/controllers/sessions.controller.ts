import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/user.interfaces";
import createSessionService from "../services/sessions/createSession.service";
import refreshSessionService from "../services/sessions/refreshSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const { login, password }: IUserLogin = req.body;
  const { accessToken, refreshToken } = await createSessionService({
    login,
    password,
  });

  return res
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // TODO: change to true on prod
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    })
    .json({ token: accessToken });
};

const refreshSessionController = async (req: Request, res: Response) => {
  const { jwt } = req.cookies;
  const token = await refreshSessionService(jwt);
  return res.json({ token });
};

const logoutSessionController = async (req: Request, res: Response) => {
  return res
    .clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // TODO: change to true on prod
      maxAge: 0,
    })
    .status(200)
    .send();
};

export {
  createSessionController,
  refreshSessionController,
  logoutSessionController,
};
