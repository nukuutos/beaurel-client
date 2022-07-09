import { useSelector } from 'react-redux';

const useSessionTime = () => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  const isUpdateSessionTime = update?.sessionTime;
  const correctSessionTime = isUpdateSessionTime ? update.sessionTime : sessionTime;

  return { correctSessionTime, isUpdateSessionTime };
};

export default useSessionTime;
