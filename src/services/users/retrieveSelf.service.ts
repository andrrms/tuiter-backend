import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";

const retrieveSelfService = async (id: string) => {
  const userRepo = AppDataSource.getRepository(User);

  /* const foundUser = userRepo.findOneBy({ id }); */
  const foundUser = userRepo
    .createQueryBuilder("u")
    .select(
      `${[
        "id",
        "name",
        "username",
        "email",
        "biography",
        "localization",
        "site",
        "birth_date",
        "avatar_url",
        "is_active",
        "authorization_level",
        "created_at",
        "updated_at",
      ]
        .map((w) => "u." + w)
        .join(",")}`
    )
    .leftJoin("users_follows", "f", "f.follower_id = :id")
    .addSelect("COUNT(f.follower_id)", "followers_count")
    .addSelect("COUNT(f.target_id)", "following_count")
    .where("u.id = :id", { id })
    .groupBy("u.id, f.follower_id, f.target_id")
    .getRawOne();
  if (!foundUser) throw new AppError("Something went wrong...", 500);

  return foundUser;
};

export default retrieveSelfService;
