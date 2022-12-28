import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createUserService from "../services/users/createUser.service";
import retrieveUserService from "../services/users/retrieveUser.service";
import defineAvatarService from "../services/users/defineAvatar.service";
import retrieveAvatarService from "../services/users/retrieveAvatar.service";
import { IUserRequest } from "../interfaces/user.interfaces";
import { AppError } from "../errors/AppError";
import retrieveSelfService from "../services/users/retrieveSelf.service";

const createUserController = async (req: Request, res: Response) => {
  const data: IUserRequest = req.body;
  const user = await createUserService(data);
  return res.status(201).json(instanceToPlain(user));
};

const retrieveUserController = async (req: Request, res: Response) => {
  const { keyword } = req.params;
  const { id } = req.user;
  const user = await retrieveUserService(keyword, id);
  return res.json(instanceToPlain(user));
};

const defineAvatarController = async (req: Request, res: Response) => {
  const userWithPic = await defineAvatarService(req.file, req.user.username);
  return res.status(200).json(instanceToPlain(userWithPic));
};

const retrieveAvatarController = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = await retrieveAvatarService(filename);
  return res.status(200).sendFile(filePath, (err) => {
    if (err) throw new AppError(err.message, 500);
  });
};

const retrieveSelfController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await retrieveSelfService(id);
  return res.json(instanceToPlain(user));
};

export {
  createUserController,
  retrieveUserController,
  defineAvatarController,
  retrieveAvatarController,
  retrieveSelfController,
};
