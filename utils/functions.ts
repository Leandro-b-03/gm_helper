export const isLastLevel = (object: object, levelKey: string): boolean => {
  const levels = Object.keys(object);
  return levelKey === levels[levels.length - 1];
};

export const textEllipsis = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}