import { hash } from "bcryptjs";

import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interfaces";
import requiredArgs from "../../utils/requiredArgs";

const createUserService = async ({
  name,
  username,
  email,
  password,
  birth_date,
}: IUserRequest): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const missing = requiredArgs({ name, username, email, password, birth_date });

  if (missing.length > 0)
    throw new AppError(
      `Está faltando os seguintes dados: ${missing.join(", ")}`
    );

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
    biography: "E aí. Estou usando o Tuíter!",
  });
  const finalUser = await userRepo.save(user);

  return finalUser;
};

export default createUserService;
