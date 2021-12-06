import React from "react";
import useDots from "./use-dots/use-dots";

const AppointmentsDots = ({ days, daysNumber, active, direction }) => {
  const [dots, dotsOffsetStyles, dotsWidthStyles] = useDots({ active, daysNumber, direction });
  const isDate = !!daysNumber;

  return (
    <>
      {isDate && (
        <div className="card appointments__date mt-8">
          <span>Дата</span>
          <span>{days[active]}</span>
        </div>
      )}
      {daysNumber > 1 && (
        <div className="card appointments__dots mt-8">
          <div style={dotsWidthStyles} className="appointments__date-dots">
            <div style={dotsOffsetStyles} className="appointments__date-dot-window">
              {dots}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentsDots;
