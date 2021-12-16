import { FieldArray } from 'formik';
import useEditState from './use-edit-state';
import useWeekendsKeys from './use-weekends-keys';
import DisplayWeekends from './display-weekends';
import EditButton from './edit-button';
import EditModal from './edit-modal';

const Weekends = ({ values, editState, setFieldValue }) => {
  const [{ element }] = editState;

  const { isDisabled, handleClicks } = useEditState({ values, editState, setFieldValue });

  useWeekendsKeys(handleClicks);

  return (
    <>
      <DisplayWeekends values={values} />

      {element.weekends && (
        <FieldArray
          name="edit.auto.weekends"
          render={(fieldArrayProps) => (
            <EditModal values={values} handleClicks={handleClicks} {...fieldArrayProps} />
          )}
        />
      )}

      {!isDisabled && <EditButton editState={editState} />}
    </>
  );
};

export default Weekends;
