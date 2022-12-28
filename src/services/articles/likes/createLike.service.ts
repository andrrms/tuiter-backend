import AppDataSource from "../../../data-source";
import ArticleLikes from "../../../entities/ArticleLikes.entity";
import User from "../../../entities/User.entity";

const createLikeService = async (userId: string, articleId: string) => {
  const likeRepo = AppDataSource.getRepository(ArticleLikes);

  const like = likeRepo.create({
    article: articleId,
    user: userId,
  });

  const finalLike = await likeRepo.save(like);

  return finalLike;
};

export default createLikeService;
