export const computeOffset = (active, stylesRef, isOffset, direction) => {
  if (!isOffset) return stylesRef.current;

  const dotWidth = 4;
  const dotDistance = 4;
  const dotsPassed = direction > 0 ? active - 5 : active - 1;
  const offset = dotsPassed * dotWidth + dotsPassed * dotDistance;

  stylesRef.current = { left: `2px`, transform: `translateX(-${offset}px)` };

  return stylesRef.current;
};

export const getIsOffset = (step, direction) => {
  if (direction === 0) return false;

  if (step > 0 && step < 5) return false;
  if (step === 5 && direction === -1) return false;
  if (step === 0 && direction === 1) return false;

  return true;
};
