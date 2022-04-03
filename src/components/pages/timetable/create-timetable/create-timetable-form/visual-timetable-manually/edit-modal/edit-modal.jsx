import { FieldArray } from 'formik';
import AddTime from './add-time';

const EditModal = ({ modalState, values }) => {
  const [{ weekdayIndex }] = modalState;

  return (
    <FieldArray
      name={`manually.appointments[${weekdayIndex}]`}
      render={(fieldArrayProps) => (
        <AddTime modalState={modalState} values={values} {...fieldArrayProps} />
      )}
    />
  );
};

export default EditModal;
