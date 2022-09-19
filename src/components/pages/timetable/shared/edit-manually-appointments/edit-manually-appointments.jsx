import { FieldArray } from 'formik';
import AddTime from './add-time';

const EditManuallyAppointments = ({ state, ...props }) => {
  const { weekdayIndex } = state;

  return (
    <FieldArray
      name={`manually.appointments[${weekdayIndex}]`}
      render={(fieldArrayProps) => <AddTime state={state} {...props} {...fieldArrayProps} />}
    />
  );
};

export default EditManuallyAppointments;
