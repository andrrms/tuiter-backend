import AppDataSource from "../../data-source";
import ArticlePost from "../../entities/ArticlePost.entity";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { IArticleRequest } from "../../interfaces/article.interfaces";
import { checkRequiredFields } from "../../utils";

const createArticleService = async (
  { body, localization, article_quote_id, article_reply_id }: IArticleRequest,
  userId: string
) => {
  checkRequiredFields({ body }, { throwError: true });

  const articleRepo = AppDataSource.getRepository(ArticlePost);
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id: userId });
  if (!foundUser) throw new AppError("Deu merda ein", 500);

  const article = articleRepo.create({
    body,
    localization,
    author: foundUser,
    article_quote: article_quote_id,
    article_reply: article_reply_id,
  });
  const finalArticle = await articleRepo.save(article);

  return finalArticle;
};

export default createArticleService;
