import { useSelector } from 'react-redux';

const useEditState = ({ editState, values, setFieldValue, finishEditWorkingDay }) => {
  const { update } = useSelector((state) => state.timetable);
  const { isEditing, element } = editState;
  const isDisabled = update.date || (isEditing && !element.workingDay);

  const { workingDay } = values.edit.auto;

  const handleEdit = () => {
    setFieldValue('auto.workingDay', workingDay);
    finishEditWorkingDay();
  };

  const handleCancel = () => {
    finishEditWorkingDay();
  };

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
