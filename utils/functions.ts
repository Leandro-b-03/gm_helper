export const isLastLevel = (object: object, levelKey: string): boolean => {
  const levels = Object.keys(object);
  return levelKey === levels[levels.length - 1];
};