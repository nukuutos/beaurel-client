export const computeWidth = (isDotsAppearred, daysNumber) => {
  const [isLeft, isRight] = isDotsAppearred;

  let dotsWidthStyles = {};

  // 5rem
  if (isRight && isLeft) dotsWidthStyles = { width: `5.3rem` };
  else if (isRight || isLeft) dotsWidthStyles = { width: `4.6rem` };
  else dotsWidthStyles = { width: `${7 + (daysNumber - 1) * 4 * 2}px` }; // 3.8

  return dotsWidthStyles;
};
