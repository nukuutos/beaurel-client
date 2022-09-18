import { useSelector } from 'react-redux';
import DisplayServices from './display-services';
import NoServices from './no-services/no-services';
import useGetServices from './use-get-services';

const BookingServices = ({ closeServices, getPickService, state }) => {
  const { services } = useSelector((state) => state.services);

  const isLoading = useGetServices();

  return isLoading || services.length ? (
    <DisplayServices
      onClickClose={closeServices}
      getPickService={getPickService}
      state={state}
      isLoading={isLoading}
    />
  ) : (
    <NoServices onClickClose={closeServices} />
  );
};

export default BookingServices;
