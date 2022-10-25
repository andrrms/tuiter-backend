export default function requiredArgs(args: Record<string, any>) {
  const missingArgs: string[] = [];

  Object.entries(args).forEach(([key, value]) => {
    if (value == undefined) missingArgs.push(key);
  });

  return missingArgs;
}
