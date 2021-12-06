import { useEffect, useRef, useState } from "react";
import { areLastDotsAppeared, generateDots } from "./utils/dots";
import { computeLeftDot, computeRightDot, handleStep } from "./utils/last-dots";
import { computeOffset, getIsOffset } from "./utils/offset";
import { computeWidth } from "./utils/styles";

const useDots = ({ daysNumber, direction, active }) => {
  const step = useRef(0);
  const dotsStylesRef = useRef({ transform: `translateX(0)`, left: "2px" });
  const [lastIndexes, setLastIndexes] = useState({ leftDot: null, rightDot: 5 });

  useEffect(() => {
    handleStep(step, direction);

    const values = { active, direction, step: step.current };
    const leftDot = computeLeftDot({ ...values, leftDot: lastIndexes.leftDot });
    const rightDot = computeRightDot({ ...values, rightDot: lastIndexes.rightDot });

    setLastIndexes({ leftDot, rightDot });
  }, [active]);

  const isOffset = getIsOffset(step.current, direction);
  const isDotsAppearred = areLastDotsAppeared(daysNumber, lastIndexes);
  const dotsOffsetStyles = computeOffset(active, dotsStylesRef, isOffset, direction);
  const dotsWidthStyles = computeWidth(isDotsAppearred, daysNumber);
  const dots = generateDots(daysNumber, lastIndexes, active);

  return [dots, dotsOffsetStyles, dotsWidthStyles];
};

export default useDots;
