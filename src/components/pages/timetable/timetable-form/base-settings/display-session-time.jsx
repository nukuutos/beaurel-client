import Pen from '../../../../base/icons/pen';

const DisplaySessionTime = ({ values, isDisabled, startEditSessionTime }) => {
  const { sessionTime } = values;

  return (
    <>
      <span className="timetable-card__value">{sessionTime} мин</span>
      {!isDisabled && (
        <div
          onClick={startEditSessionTime}
          className="timetable-card__btn-edit timetable-card__btn-edit--absolute btn-icon"
        >
          <Pen />
        </div>
      )}
    </>
  );
};

export default DisplaySessionTime;
