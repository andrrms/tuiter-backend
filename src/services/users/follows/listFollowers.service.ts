import AppDataSource from "../../../data-source";
import UserFollow from "../../../entities/UserFollow.entity";
import { AppError } from "../../../errors/AppError";

const listFollowersService = async (id: string): Promise<UserFollow[]> => {
  const followRepo = AppDataSource.getRepository(UserFollow);

  const followers = await followRepo
    .createQueryBuilder()
    .where("UserFollow.following.id = :id", { id })
    .getMany();

  if (!followers) throw new AppError("Algo deu errado", 500);
  if (followers.length === 0)
    throw new AppError("Você não tem seguidores", 404);

  return followers;
};

export default listFollowersService;
