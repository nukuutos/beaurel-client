import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { updateWorkSuccess } from '../../../../../../../redux/work/actions';

const useOnSubmit = ({ state, goToCarousel, file }) => {
  const [{ accessToken }, { id: profileId }, { works }] = useSelector((state) => [
    state.auth,
    state.profile,
    state.work,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { index } = state;

  const handleSubmit = async (values) => {
    const { title } = values;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    const config = {
      method: 'put',
      url: `/master/${profileId}/work/${works[index]._id}`,
      data: formData,
      accessToken,
      addingHeaders: {
        'Content-Type': `multipart/form-data`,
        Enctype: 'multipart/form-data',
      },
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(updateWorkSuccess({ updatedWork: { _id: works[index]._id, title } }));
      goToCarousel();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
