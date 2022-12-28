import AppDataSource from "../../data-source";
import ArticlePost from "../../entities/ArticlePost.entity";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { checkRequiredFields } from "../../utils";

const listUserArticlesService = async (
  username: string
): Promise<ArticlePost[]> => {
  checkRequiredFields(
    { username: username },
    {
      throwError: true,
    }
  );

  const articleRepo = AppDataSource.getRepository(ArticlePost);
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy([{ username }]);
  if (!foundUser) throw new AppError("Usuário não encontrado", 404);

  const articles = await articleRepo.find({
    where: { author: { id: foundUser.id } },
    order: {
      created_at: "DESC",
    },
  });

  return articles;
};

export default listUserArticlesService;
