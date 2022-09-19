import EditManuallyAppointments from '../../../shared/edit-manually-appointments/edit-manually-appointments';
import DisplayDay from './display-day';
import weekdaysRU from '../../../utils/weekdays-ru';
import useVisualTimetableManuallyState from '../../../shared/use-visual-timetable-manually-state';

const VisualTimetableManually = ({ values, setFieldError, errors, submitForm, editState }) => {
  const [state, actions] = useVisualTimetableManuallyState();
  const { isOpen } = state;

  return (
    <>
      <h2 className="sign-up__heading">Укажите время ваших записей</h2>

      <div className="create-timetable__auto-timetable timetable-visual mt-4">
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
            state={state}
            errors={errors}
            setFieldError={setFieldError}
            values={values}
            {...actions}
          />
        )}
      </div>

      <button
        onClick={submitForm}
        type="submit"
        className="create-timetable__btn btn btn--primary sign-up__btn mt-6"
      >
        Готово
      </button>
    </>
  );
};

export default VisualTimetableManually;
