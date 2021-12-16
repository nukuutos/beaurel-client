import { useSelector } from 'react-redux';

const useGetInitialValues = () => {
  const timetable = useSelector((state) => state.timetable);

  const {
    manually,
    update,
    sessionTime,
    auto,
    _id: timetableId,
    ...restTimetableProps
  } = timetable;

  return {
    ...restTimetableProps,
    // purpose of "edit" is to control editing process
    edit: {
      sessionTime,
      auto,
    },
    sessionTime,
    auto,
    manually: { ...manually, hours: 540, mins: 0 },
    date: null,
  };
};

export default useGetInitialValues;
