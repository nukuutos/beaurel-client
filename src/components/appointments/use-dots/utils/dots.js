const getClassName = (i, active, { leftDot, rightDot }) => {
  let className = "appointments__date-dot";

  if (i === active) className += " appointments__date-dot--active";
  else if (i === leftDot || i === rightDot) className += " appointments__date-dot--mini";

  return className;
};

export const generateDots = (number, lastIndexes, active) => {
  const dots = [];

  for (let i = 0; i < number; i++) {
    const className = getClassName(i, active, lastIndexes);
    dots.push(<div key={i} className={className} />);
  }

  return dots;
};

export const areLastDotsAppeared = (number, { leftDot, rightDot }) => {
  let isRight, isLeft;
  for (let i = 0; i < number; i++) {
    if (i === leftDot) isLeft = true;
    else if (i === rightDot) isRight = true;
  }
  return [isLeft, isRight];
};
