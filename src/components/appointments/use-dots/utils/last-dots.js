export const computeRightDot = ({ active, direction, step, rightDot }) => {
  if (step === 5 && direction === 1) return active + 1;
  else if (step === 0 && direction === -1) return active + 5;
  return rightDot;
};

export const computeLeftDot = ({ active, direction, step, leftDot }) => {
  if (step === 0 && direction === -1) return active - 1;
  else if (step === 5 && direction === 1) return active - 5;
  return leftDot;
};

export const handleStep = (stepRef, direction) => {
  const stepValue = stepRef.current;
  if (direction === 1 && stepValue < 5) stepRef.current++;
  else if (direction === -1 && stepValue > 0) stepRef.current--;
};
