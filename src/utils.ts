import { AppError } from "./errors/AppError";

interface IOptions {
  throwError?: boolean;
  /** Use `{property}` to replace into the missing key name */
  genericMessage?: string;
}

/**
 * This will raise an AppError if any of the fields is missing
 */
export function checkRequiredFields(
  fields: Record<string, any>,
  options: IOptions = {
    throwError: false,
    genericMessage: "{property} is missing",
  }
): false | string[] {
  const errored = Object.entries(fields)
    .map(([key, value]) => {
      if (!value) return options.genericMessage?.replace("{property}", key);
    })
    .filter((v) => v);

  if (options.throwError && errored.length)
    throw new AppError(errored.join(", "), 400);
  if (errored) return errored as string[];
  return false;
}
