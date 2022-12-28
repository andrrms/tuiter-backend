import AppDataSource from "../../../data-source";
import User from "../../../entities/User.entity";
import UserFollow from "../../../entities/UserFollow.entity";
import { AppError } from "../../../errors/AppError";

const removeFollowService = async (
  followingUsername: string,
  followerId: string
) => {
  const userRepo = AppDataSource.getRepository(User);
  const followRepo = AppDataSource.getRepository(UserFollow);

  const targetUser = await userRepo.findOne({
    where: {
      username: followingUsername,
    },
  });
  if (!targetUser)
    throw new AppError(
      "Você está tentando deixar de seguir um usuário que não existe",
      404
    );

  if (followerId === targetUser.id)
    throw new AppError("Você não pode deixar de seguir a si mesmo", 403);

  const selfUser = await userRepo.findOne({ where: { id: followerId } });
  if (!selfUser) throw new AppError("Algo deu errado.", 500);

  const alreadyFollowing = await followRepo
    .createQueryBuilder()
    .where("UserFollow.follower.id = :id1 AND UserFollow.target.id = :id2", {
      id1: selfUser.id,
      id2: targetUser.id,
    })
    .getOne();
  if (!alreadyFollowing)
    throw new AppError(`Você não segue @${followingUsername}`, 409);

  const finalFollow = await followRepo.delete({
    follower: selfUser,
    target: targetUser,
  });
  if (!finalFollow) throw new AppError("Algo deu errado", 500);

  return finalFollow;
};

export default removeFollowService;
