import { Request, Response } from "express";
import createFollowService from "../services/users/follows/createFollow.service";
import listFollowersService from "../services/users/follows/listFollowers.service";
import listFollowingService from "../services/users/follows/listFollowing.service";
import removeFollowService from "../services/users/follows/removeFollow.service";

const createFollowController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { username } = req.params;

  await createFollowService(username, id);
  return res.json({
    message: `Agora você segue @${username}`,
  });
};

const removeFollowController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { username } = req.params;

  await removeFollowService(username, id);
  return res.json({
    message: `Você deixou de seguir @${username}`,
  });
};

const listFollowersController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const followers = await listFollowersService(id);
  return res.json({
    count: followers.length,
    followers,
  });
};

const listFollowingController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const following = await listFollowingService(id);
  return res.json({
    count: following.length,
    following,
  });
};

export {
  createFollowController,
  removeFollowController,
  listFollowersController,
  listFollowingController,
};
