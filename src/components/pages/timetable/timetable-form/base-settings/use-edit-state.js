import { useSelector } from 'react-redux';
import clearManuallyAppointments from '../../utils/clear-manually-appointments';
import filterExceptions from '../../utils/filter-exceptions';

const useEditState = ({ editState, values, setFieldValue }) => {
  const { update } = useSelector((state) => state.timetable);
  const [{ isEditing, element }, setEditState] = editState;

  const { auto, edit } = values;
  const { sessionTime } = edit;
  const { exceptions, workingDay } = auto;
  const { startAt } = workingDay;

  const isDisabled = update.date || (isEditing && !element.sessionTime);

  const handleEdit = () => {
    const filteredExceptions = filterExceptions(exceptions, sessionTime, startAt);
    const clearedManuallyAppointments = clearManuallyAppointments();

    setFieldValue('auto.exceptions', filteredExceptions);
    setFieldValue('manually.appointments', clearedManuallyAppointments);
    setFieldValue('sessionTime', sessionTime);

    setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
  };

  const handleCancel = () => {
    setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
  };

  const handleClicks = [handleEdit, handleCancel];

  return { isDisabled, handleClicks };
};

export default useEditState;
