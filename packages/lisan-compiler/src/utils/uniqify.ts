const uniqify = (arr: string[]): string[] =>
  arr.filter((item, index) => arr.indexOf(item) === index);

export default uniqify;
