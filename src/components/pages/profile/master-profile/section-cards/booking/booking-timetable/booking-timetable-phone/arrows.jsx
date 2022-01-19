import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Arrows = ({ controllers }) => {
  const { toPrevDay, toNextDay } = controllers;
  return (
    <>
      <button type="button" onClick={toPrevDay} className="booking-timetable__side">
        <div className="booking-timetable__arrow btn-icon">
          <FontAwesomeIcon icon="chevron-left" />
        </div>
      </button>

      <button
        type="button"
        onClick={toNextDay}
        className="booking-timetable__side booking-timetable__side--right"
      >
        <div className="booking-timetable__arrow booking-timetable__arrow--right btn-icon">
          <FontAwesomeIcon icon="chevron-right" />
        </div>
      </button>
    </>
  );
};

export default Arrows;
