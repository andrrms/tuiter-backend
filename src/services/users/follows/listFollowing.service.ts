import AppDataSource from "../../../data-source";
import UserFollow from "../../../entities/UserFollow.entity";
import { AppError } from "../../../errors/AppError";

const listFollowingService = async (id: string): Promise<UserFollow[]> => {
  const followRepo = AppDataSource.getRepository(UserFollow);

  const following = await followRepo
    .createQueryBuilder()
    .where("UserFollow.follower.id = :id", { id })
    .getMany();

  if (!following) throw new AppError("Algo deu errado", 500);
  if (following.length === 0) throw new AppError("Você não segue ninguém", 404);

  return following;
};

export default listFollowingService;
