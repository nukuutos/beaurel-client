import { useSelector } from 'react-redux';

const filterExceptions = (exceptions, weekends) => {
  const filteredExceptions = { ...exceptions };

  for (const weekend of weekends) {
    filteredExceptions[weekend] = [];
  }

  return filteredExceptions;
};

const useEditState = ({ values, editState, setFieldValue, finishEditWeekends }) => {
  const { update } = useSelector((state) => state.timetable);
  const { auto, edit } = values;
  const { exceptions } = auto;
  const { weekends } = edit.auto;
  const { isEditing, element } = editState;

  const handleEdit = () => {
    const filteredExceptions = filterExceptions(exceptions, weekends);
    setFieldValue('auto.weekends', weekends);
    setFieldValue('auto.exceptions', filteredExceptions);
    finishEditWeekends();
  };

  const handleCancel = () => {
    finishEditWeekends();
  };

  const isDisabled = update.date || (isEditing && !element.weekends);

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
