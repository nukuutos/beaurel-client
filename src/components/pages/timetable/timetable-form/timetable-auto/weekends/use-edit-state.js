import { useSelector } from 'react-redux';

const useEditState = ({ values, editState, setFieldValue }) => {
  const { update } = useSelector((state) => state.timetable);
  const { weekends } = values.edit.auto;
  const [{ isEditing, element }, setEditState] = editState;

  const handleEdit = () => {
    setFieldValue('auto.weekends', weekends);
    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
    // need to delete exceptions on day that we mark as weekend
  };

  const handleCancel = () => {
    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
  };

  const isDisabled = update.date || (isEditing && !element.weekends);

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
