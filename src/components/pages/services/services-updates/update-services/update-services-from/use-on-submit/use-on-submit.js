import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { putUpdateToServices } from '../../../../../../../redux/slices/service/service';
import prepareDataForApi from './prepare-data-for-api';

const useOnSubmit = (close) => {
  const [{ services, masterId: servicesMasterId }, { id: masterId, accessToken }] = useSelector(
    (state) => [state.services, state.auth]
  );

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const isServicesLoaded = services.length && servicesMasterId === masterId;

  const handleSubmit = async (values) => {
    const data = prepareDataForApi(values.services);

    // async call
    const config = {
      method: 'put',
      url: `/master/${masterId}/service/update`,
      data: { services: data },
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      if (isServicesLoaded) dispatch(putUpdateToServices({ services: data }));
      close();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
