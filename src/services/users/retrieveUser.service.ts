import { ILike } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";

const retrieveUserService = async (keyword: string): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.find({
    where: [{ name: ILike(keyword) }, { username: keyword }],
  });

  if (!foundUser) throw new AppError("Usuário não encontrado", 404);

  return foundUser;
};

export default retrieveUserService;
