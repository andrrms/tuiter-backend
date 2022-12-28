import { hash } from "bcryptjs";

import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interfaces";
import { checkRequiredFields } from "../../utils";

const createUserService = async ({
  name,
  username,
  email,
  password,
  birth_date,
  avatar_url,
}: IUserRequest): Promise<IUserResponse> => {
  checkRequiredFields(
    {
      name,
      username,
      email,
      password,
      birth_date,
    },
    {
      throwError: true,
    }
  );

  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOne({
    where: [{ username }, { email }],
  });
  if (foundUser)
    throw new AppError(
      "Já existe um usuário com este email ou nome de usuário",
      409
    );

  if (username.length <= 4)
    throw new AppError("O nome de usuário precisa ter no mínimo 5 letras", 400);

  const user = userRepo.create({
    name,
    username,
    email,
    password: await hash(password, 10),
    birth_date,
    biography: "E aí. Estou usando o Projeto X!",
    avatar_url:
      avatar_url ||
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  });
  const finalUser = await userRepo.save(user);

  return finalUser;
};

export default createUserService;
