import { ILike } from "typeorm";

import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";

const retrieveUserService = async (
  keyword: string,
  user_id: string
): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);

  /* const foundUser = await userRepo.findBy([
    { name: ILike(`%${keyword}%`) },
    { username: ILike(`%${keyword}%`) },
  ]); */

  const foundUser = (await userRepo.query(
    `
    SELECT DISTINCT
        u.*,
        CASE
            WHEN (
                f.follower_id = $2 AND f.target_id = u.id
            )
            THEN true
            ELSE false
            END as following
    FROM users u
    LEFT JOIN users_follows f
    ON f.follower_id = $2 AND f.target_id = u.id
    WHERE (
        u.name ILIKE '%' || $1 || '%'
        OR u.username ILIKE '%' || $1 || '%'
    )
    AND u.id != $2
    LIMIT 5;
  `,
    [keyword, user_id]
  )) as User[];

  console.log(foundUser);

  if (!foundUser) throw new AppError("Usuário não encontrado", 404);

  return foundUser;
};

export default retrieveUserService;
