import EditManuallyAppointments from '../../../shared/edit-manually-appointments/edit-manually-appointments';
import useVisualTimetableManuallyState from '../../../shared/use-visual-timetable-manually-state';
import weekdaysRU from '../../../utils/weekdays-ru';
import DisplayDay from './display-day';

const VisualTimetableManually = ({ values, editState, errors, setFieldError }) => {
  const [state, actions] = useVisualTimetableManuallyState();
  const { isOpen } = state;

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--timetable mt-6 card">
      <div className="timetable-card__heading timetable-card__heading--timetable mb-2 ">
        Расписание
      </div>
      <div className="timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, index) => (
          <DisplayDay
            weekdayName={weekdayName}
            index={index}
            editState={editState}
            values={values}
            key={weekdayName}
            {...actions}
          />
        ))}
        {isOpen && (
          <EditManuallyAppointments
            errors={errors}
            setFieldError={setFieldError}
            state={state}
            values={values}
            {...actions}
          />
        )}
      </div>
    </div>
  );
};

export default VisualTimetableManually;
