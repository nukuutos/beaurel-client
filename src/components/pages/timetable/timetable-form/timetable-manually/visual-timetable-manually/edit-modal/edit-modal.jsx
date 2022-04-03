import { FieldArray } from 'formik';
import AddTime from './add-time';

const EditModal = ({ modalState, ...props }) => {
  const [{ weekdayIndex }] = modalState;

  return (
    <FieldArray
      name={`manually.appointments[${weekdayIndex}]`}
      render={(fieldArrayProps) => (
        <AddTime modalState={modalState} {...props} {...fieldArrayProps} />
      )}
    />
  );
};

export default EditModal;
