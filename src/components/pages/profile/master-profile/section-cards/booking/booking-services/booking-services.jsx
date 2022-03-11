import { useSelector } from 'react-redux';
import DisplayServices from './display-services';
import NoServices from './no-services/no-services';
import useGetServices from './use-get-services';

const BookingServices = ({ onClickClose, ...props }) => {
  const { services } = useSelector((state) => state.services);

  const isLoading = useGetServices();

  return isLoading || services.length ? (
    <DisplayServices onClickClose={onClickClose} isLoading={isLoading} {...props} />
  ) : (
    <NoServices onClickClose={onClickClose} />
  );
};

export default BookingServices;
