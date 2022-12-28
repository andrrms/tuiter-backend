import sharp from "sharp";
import path from "path";
import { existsSync, unlinkSync, unlink } from "fs";

import User from "../../entities/User.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { checkRequiredFields } from "../../utils";

function removeImage(user: User) {
  try {
    const pathName = path.resolve(
      __dirname,
      "..",
      "..",
      "uploads",
      user.avatar_url.replace("users/avatar/", "")
    );

    if (existsSync(pathName)) {
      unlink(pathName, (err) => {
        if (err)
          throw new AppError(
            "Internal error when setting new profile picture",
            500
          );
      });
    }
  } catch (err) {
    throw new AppError("Deu ruim", 500);
  }
}

const defineAvatarService = async (
  file: any,
  username: string
): Promise<User> => {
  checkRequiredFields({ username }, { throwError: true });
  if (!file) throw new AppError("No photo was uploaded", 400);

  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ username });
  if (!foundUser) throw new AppError("No user was found", 404);

  if (foundUser.avatar_url.trim()) removeImage(foundUser);

  const fileName = `${Date.now()}_${username}_avatar.jpeg`;
  await sharp(file.buffer)
    .resize(250, 250)
    .jpeg({ quality: 50 })
    .toFile(`${__dirname}/../../uploads/${fileName}`);

  foundUser.avatar_url = `users/avatar/${fileName}`;
  const finalUser = await userRepo.save(foundUser);

  return finalUser;
};

export default defineAvatarService;
