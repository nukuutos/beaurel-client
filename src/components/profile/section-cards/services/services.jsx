import { useSelector } from 'react-redux';
import MastersServicesView from './master-services/master-services';
import Booking from '../booking/booking';

const Services = ({ onClickClose }) => {
  const { isPublicView } = useSelector((state) => state.profile); // add public view

  return isPublicView ? (
    <Booking isService onClickClose={onClickClose} />
  ) : (
    <MastersServicesView onClickClose={onClickClose} />
  );
};

export default Services;
