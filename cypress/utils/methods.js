const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const getRandomLength = (start, end) => {
  // end exclusive
  const middle = Math.round(end / 2);

  const startIndex = getRandomInt(start, middle);
  const endIndex = getRandomInt(middle, end);

  return [startIndex, endIndex];
};
