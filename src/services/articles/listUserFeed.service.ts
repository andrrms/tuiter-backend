import AppDataSource from "../../data-source";
import ArticlePost from "../../entities/ArticlePost.entity";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { IArticleFeed } from "../../interfaces/article.interfaces";
import { checkRequiredFields } from "../../utils";

const listUserFeedService = async (
  id: string,
  pageNumber: number = 1
): Promise<ArticlePost[]> => {
  checkRequiredFields({ id }, { throwError: true });

  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id });
  if (!foundUser) throw new AppError("User not found", 404);

  // Not the ideal, but TypeORM refuses to work with QueryBuilder
  /* const posts = (await AppDataSource.manager.query(
    `
      SELECT a.*,
          u.name,
          u.username,
          u.biography,
          u.avatar_url,
          COUNT(f.target_id) as following_count,
          COUNT(f.follower_id) as follower_count,
          COUNT(l.article_id) as 
      FROM article_post a
      LEFT JOIN users u
      ON u.id = a.author_id
      LEFT JOIN users_follows f
      ON f.follower_id = $1
      LEFT JOIN article_likes l
      ON l.user_id = $1 AND l.article_id = a.id
      WHERE a.author_id = f.target_id OR a.author_id = $1
      GROUP BY a.id, u.name, u.username, u.biography, u.avatar_url
      ORDER BY a.created_at DESC
      LIMIT 20
      OFFSET $2;
    `,
    [foundUser.id, 5 * (pageNumber - 1)]
  )) as IArticleFeed[]; */

  const posts = (await AppDataSource.manager.query(
    `
      SELECT a.*,
          u.name,
          u.username,
          u.biography,
          u.avatar_url,
          COUNT(f.target_id) as following_count,
          COUNT(f.follower_id) as follower_count,
          COUNT(l.article_id) as likes_count,
          COUNT(r.article_id) as retweets_count,
          CASE
              WHEN l.user_id = $1 AND l.article_id = a.id
              THEN true
              ELSE false
              END as has_liked,
          CASE
              WHEN r.user_id = $1 AND r.article_id = a.id
              THEN true
              ELSE false
              END as has_retweeted
      FROM article_post a
      LEFT JOIN users u
      ON u.id = a.author_id
      LEFT JOIN users_follows f
      ON f.follower_id = $1
      LEFT JOIN article_likes l
      ON l.article_id = a.id
      LEFT JOIN article_retweets r
      ON r.article_id = a.id
      WHERE a.author_id = f.target_id OR a.author_id = $1
      GROUP BY a.id,
        u.name,
            u.username,
            u.biography,
            u.avatar_url,
            l.user_id,
            l.article_id,
            r.user_id,
            r.article_id
      ORDER BY a.created_at DESC
      LIMIT 50
      OFFSET $2;
    `,
    [foundUser.id, 5 * (pageNumber - 1)]
  )) as IArticleFeed[];

  const plain = posts.map((post) => {
    // We ignore password here
    const {
      name,
      username,
      biography,
      avatar_url,
      author_id,
      following_count,
      follower_count,
      ...article
    } = post;

    const finalObj = {
      ...article,
      author: {
        id: author_id,
        name,
        username,
        biography,
        avatar_url,
        following_count: +following_count,
        follower_count: +follower_count,
      },
    };

    return finalObj;
  });

  return plain as unknown as ArticlePost[];
};

export default listUserFeedService;
