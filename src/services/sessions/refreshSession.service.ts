import "dotenv/config";
import jwt from "jsonwebtoken";

import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { AppError } from "../../errors/AppError";

interface TokenProps extends jwt.JwtPayload {
  authorization_level: number;
  username: string;
}

const refreshSessionService = async (token: string) => {
  try {
    const { username } = jwt.verify(
      token,
      process.env.REFRESH_SECRET_KEY!
    ) as TokenProps;

    const userRepo = AppDataSource.getRepository(User);
    const foundUser = await userRepo.findOneByOrFail({ username });

    const newToken = jwt.sign(
      {
        username: username,
        authorizationLevel: foundUser.authorization_level,
      },
      process.env.SECRET_KEY!,
      {
        subject: foundUser.id,
        expiresIn: "3m",
      }
    );

    return newToken;
  } catch (err) {
    console.error(err);
    throw new AppError("expired refresh token", 406);
  }
};

export default refreshSessionService;
