import path from "path";

import { checkRequiredFields } from "../../utils";

const retrieveAvatarService = async (filename: string) => {
  checkRequiredFields({ filename }, { throwError: true });

  const fileName = filename.replace("users/avatar/", "");
  const filePath = path.resolve(__dirname, "../../", "uploads", fileName);

  return filePath;
};

export default retrieveAvatarService;
