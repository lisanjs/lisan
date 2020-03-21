const formatTitle = (str: string): string =>
  str
    .replace(/\n/gi, ' ')
    .replace(/\t/gi, ' ')
    .replace(/\s+/gi, ' ')
    .substring(0, 128);

export default formatTitle;
