import { Request, Response } from "express";
import createLikeService from "../services/articles/likes/createLike.service";

const createLikeController = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;
  const like = await createLikeService(userId, articleId);
  return res.status(201).json(like);
};

export { createLikeController };
