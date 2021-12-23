import { useSelector } from 'react-redux';

const useIsUpdateDuration = () => {
  const { sessionTime, update } = useSelector((state) => state.timetable);
  if (!update?.sessionTime) return false;
  if (sessionTime === update.sessionTime) return false;
  return true;
};

export default useIsUpdateDuration;
