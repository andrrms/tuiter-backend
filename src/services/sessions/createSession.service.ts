import "dotenv/config";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/user.interfaces";

const createSessionService = async ({
  login,
  password,
}: IUserLogin): Promise<{ accessToken: string; refreshToken: string }> => {
  const userRepo = AppDataSource.getRepository(User);
  const invalidLogin = new AppError("Invalid login or password", 401);

  const foundUser = await userRepo.findOne({
    where: [{ email: login }, { username: login }],
  });
  if (!foundUser) throw invalidLogin;

  const passwordMatch = await compare(password, foundUser.password);
  if (!passwordMatch) throw invalidLogin;

  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      authorizationLevel: foundUser.authorization_level,
    },
    process.env.SECRET_KEY!,
    {
      subject: foundUser.id,
      expiresIn: "3m",
    }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_SECRET_KEY!,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export default createSessionService;
