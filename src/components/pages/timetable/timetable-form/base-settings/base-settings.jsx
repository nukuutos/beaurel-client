import useEditState from './use-edit-state';
import DisplaySessionTime from './display-session-time';
import EditSessionTime from './edit-session-time/edit-session-time';
import PossibleServiceDurations from '../../shared/possible-service-durations';

const BaseSettings = ({
  values,
  setFieldValue,
  editState,
  startEditSessionTime,
  finishEditSessionTime,
}) => {
  const { sessionTime } = editState.element;

  const { isDisabled, handleClicks } = useEditState({
    editState,
    finishEditSessionTime,
    values,
    setFieldValue,
  });

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--edit mt-6 card">
      <div className="timetable-card__heading mb-1">Базовые настройки</div>
      <label htmlFor="sessionTime" className="timetable-card__label">
        Базовая длительность сеанса:
      </label>

      {sessionTime ? (
        <EditSessionTime handleClicks={handleClicks} values={values} />
      ) : (
        <DisplaySessionTime
          values={values}
          isDisabled={isDisabled}
          startEditSessionTime={startEditSessionTime}
        />
      )}

      <PossibleServiceDurations values={values.edit} className="mt-1" />
    </div>
  );
};

export default BaseSettings;
