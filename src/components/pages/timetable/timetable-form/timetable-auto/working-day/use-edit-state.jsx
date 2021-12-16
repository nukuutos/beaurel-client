import { useSelector } from 'react-redux';

const useEditState = ({ editState, values, setFieldValue }) => {
  const { update } = useSelector((state) => state.timetable);
  const [{ isEditing, element }, setEditState] = editState;
  const isDisabled = update.date || (isEditing && !element.workingDay);

  const { workingDay } = values.edit.auto;

  const closeEditing = () =>
    setEditState({ isEditing: false, element: { ...editState, workingDay: false } });

  const handleEdit = () => {
    setFieldValue('auto.workingDay', workingDay);
    closeEditing();
  };

  const handleCancel = () => {
    closeEditing();
  };

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
