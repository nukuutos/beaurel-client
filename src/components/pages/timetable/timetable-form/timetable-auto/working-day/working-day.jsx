import useEditState from './use-edit-state';
import EditWorkingDay from './edit-working-day/edit-working-day';
import DisplayWorkingDay from './display-working-day';

const WorkingDay = ({ editState, setFieldValue, values, ...formikProps }) => {
  const [{ element }] = editState;

  const { isDisabled, handleClicks } = useEditState({ values, editState, setFieldValue });

  return (
    <>
      <span className="timetable-card__label  mt-5">Рабочий день:</span>
      {element.workingDay ? (
        <EditWorkingDay {...formikProps} handleClicks={handleClicks} />
      ) : (
        <DisplayWorkingDay values={values} isDisabled={isDisabled} editState={editState} />
      )}
    </>
  );
};

export default WorkingDay;
