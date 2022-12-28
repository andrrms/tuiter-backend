import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createArticleService from "../services/articles/createArticle.service";
import listUserArticlesService from "../services/articles/listUserArticles.service";
import listUserFeedService from "../services/articles/listUserFeed.service";

const createArticleController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const article = await createArticleService(req.body, id);
  return res.status(201).json(article);
};

const listUserArticlesController = async (req: Request, res: Response) => {
  const { keyword } = req.params;
  const articles = await listUserArticlesService(keyword);
  return res.status(200).json(instanceToPlain(articles));
};

const listUserFeedController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { page } = req.query;
  const articles = await listUserFeedService(id, +(page as string) || 1);
  return res.json(instanceToPlain(articles));
};

export {
  createArticleController,
  listUserArticlesController,
  listUserFeedController,
};
