import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { setTimetableTool } from '../../../../../redux/master-tools/actions';
import { getTimetableSuccess } from '../../../../../redux/timetable/actions';

const initialAutoValues = {
  auto: {
    workingDay: { startAt: 600, endAt: 1020 },
    exceptions: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    weekends: [],
  },
};

const initialManuallyValues = {
  manually: { appointments: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] } },
};

const useOnSubmit = () => {
  const { id, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async ({ auto, manually, ...restValues }) => {
    let data;

    if (restValues.type === 'auto') data = { auto, ...initialManuallyValues, ...restValues };
    else {
      const { appointments } = manually;
      data = { manually: { appointments }, ...initialAutoValues, ...restValues };
    }

    const config = {
      method: 'post',
      url: `/master/${id}/timetable`,
      data,
      accessToken,
    };

    const response = await asyncAction(config);

    if (response) {
      dispatch(getTimetableSuccess({ timetable: { ...data, _id: response._id } }));
      dispatch(setTimetableTool());
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
