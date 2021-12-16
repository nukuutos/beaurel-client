import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplaySessionTime = ({ values, editState, isDisabled }) => {
  const { sessionTime } = values;

  const [state, setState] = editState;

  const editSessionTime = () =>
    setState(() => ({
      isEditing: true,
      element: { ...state.element, sessionTime: true },
    }));

  return (
    <>
      <span className="timetable-card__value">{sessionTime} мин</span>
      {!isDisabled && (
        <div
          onClick={editSessionTime}
          className="timetable-card__btn-edit timetable-card__btn-edit--absolute btn-icon"
        >
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </>
  );
};

export default DisplaySessionTime;
