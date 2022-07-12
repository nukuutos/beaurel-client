import { useSelector } from 'react-redux';

const filterExceptions = (exceptions, weekends) => {
  const filteredExceptions = { ...exceptions };

  for (const weekend of weekends) {
    filteredExceptions[weekend] = [];
  }

  return filteredExceptions;
};

const useEditState = ({ values, editState, setFieldValue }) => {
  const { update } = useSelector((state) => state.timetable);
  const { auto, edit } = values;
  const { exceptions } = auto;
  const { weekends } = edit.auto;
  const [{ isEditing, element }, setEditState] = editState;

  const handleEdit = () => {
    const filteredExceptions = filterExceptions(exceptions, weekends);
    setFieldValue('auto.weekends', weekends);
    setFieldValue('auto.exceptions', filteredExceptions);
    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
  };

  const handleCancel = () => {
    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
  };

  const isDisabled = update.date || (isEditing && !element.weekends);

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
