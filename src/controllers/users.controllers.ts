import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/user.interfaces";
import createUserService from "../services/users/createUser.service";
import retrieveUserService from "../services/users/retrieveUser.service";

const createUserController = async (req: Request, res: Response) => {
  const data: IUserRequest = req.body;
  const user = await createUserService(data);
  return res.status(201).json(instanceToPlain(user));
};

const retrieveUserController = async (req: Request, res: Response) => {
  const { keyword } = req.params;
  const user = await retrieveUserService(keyword);
  return res.json(instanceToPlain(user));
};

export { createUserController, retrieveUserController };
