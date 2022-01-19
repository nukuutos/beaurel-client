import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../redux/alert/actions';
import { addWorkSuccess } from '../../../../../../../redux/work/actions';

const useOnSubmit = (file, goToWorks) => {
  const { accessToken, id: masterId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { title } = values;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    const config = {
      method: 'post',
      url: `/master/${masterId}/work`,
      data: formData,
      accessToken,
      addingHeaders: {
        'Content-Type': `multipart/form-data`,
        Enctype: 'multipart/form-data',
      },
    };

    const data = await asyncAction(config);

    if (data) {
      const { _id, ...alert } = data;
      dispatch(addWorkSuccess({ work: { _id, title } }));
      dispatch(setAlert(alert));
      goToWorks();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
