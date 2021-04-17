import Input from '../form/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filterExceptions from './utils/filter-exceptions';
import displayPossibleServiceDuration from './utils/display-possible-service-duration';

const BaseSettings = ({ values, update, initialValues, setFieldValue, editParentState }) => {
  const { exceptions, startAt, editingSessionTime, sessionTime } = values;
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.sessionTime);

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--edit mt-8 card">
      <div className="timetable-card__heading mb-2 ">Базовые настройки</div>
      <label className="timetable-card__label">Базовая длительность сеанса:</label>
      {element.sessionTime ? (
        <>
          <Input className="input timetable-card__input ml-1 mb-1" name="editingSessionTime" type="number" />
          <span className="timetable-card__value ml-1 mb-1">мин</span>
          <div
            onClick={() => {
              const filteredExceptions = filterExceptions(exceptions, sessionTime, startAt);
              setFieldValue('auto.exceptions', filteredExceptions);
              setFieldValue('sessionTime', editingSessionTime);
              setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
            }}
            className="timetable-card__btn-edit--primary btn-icon btn-icon--success">
            <FontAwesomeIcon icon="check" />
          </div>
          <div
            onClick={() => {
              setFieldValue('editingSessionTime', initialValues.editingSessionTime);
              setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
            }}
            className="timetable-card__btn-edit btn-icon btn-icon--fail">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
      ) : (
        <>
          <span className="timetable-card__value">{sessionTime} мин</span>
          {!isDisabled && (
            <div
              onClick={() => setEditState({ isEditing: true, element: { ...editState, sessionTime: true } })}
              className="timetable-card__btn-edit btn-icon">
              <FontAwesomeIcon icon="pen" />
            </div>
          )}
        </>
      )}

      <span className="timetable-card__tip mt-1">
        Возможная длительность ваших услуг:
        {/* generate */}
        <span className="timetable-card__tip--primary">{displayPossibleServiceDuration(sessionTime)}</span>
      </span>
    </div>
  );
};

export default BaseSettings;
