import { useSelector } from 'react-redux';
import NoServicesCustomer from './no-services-customer';
import NoServicesMaster from './no-services-master';

const NoServices = ({ onClickClose }) => {
  const [{ id: profileId }, { id: userId }] = useSelector((state) => [state.profile, state.auth]);
  return profileId === userId ? (
    <NoServicesMaster onClickClose={onClickClose} />
  ) : (
    <NoServicesCustomer onClickClose={onClickClose} />
  );
};

export default NoServices;
