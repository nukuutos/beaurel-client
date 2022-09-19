import useEditState from './use-edit-state';
import EditWorkingDay from './edit-working-day/edit-working-day';
import DisplayWorkingDay from './display-working-day';

const WorkingDay = ({
  editState,
  setFieldValue,
  values,
  startEditWorkingDay,
  finishEditWorkingDay,
  ...props
}) => {
  const { element } = editState;

  const { isDisabled, handleClicks } = useEditState({
    values,
    editState,
    setFieldValue,
    finishEditWorkingDay,
  });

  return (
    <>
      <span className="timetable-card__label  mt-5">Рабочий день:</span>
      {element.workingDay ? (
        <EditWorkingDay {...props} handleClicks={handleClicks} />
      ) : (
        <DisplayWorkingDay
          values={values}
          isDisabled={isDisabled}
          startEditWorkingDay={startEditWorkingDay}
        />
      )}
    </>
  );
};

export default WorkingDay;
