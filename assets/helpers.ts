export const removeFileExtension = (path: string): string => {
  return path?.split(".")?.slice(0, -1)?.join(".");
};

export const throw404 = (condition: boolean): void => {
  if (condition)
    throw createError({ statusCode: 404, message: `This page doesn't exist` });
};
