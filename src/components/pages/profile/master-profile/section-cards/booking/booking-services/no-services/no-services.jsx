import { useSelector } from 'react-redux';
import NoServicesCustomer from './no-services-customer';
import NoToolsMaster from '../../shared/no-tools-master';

const NoServices = ({ onClickClose }) => {
  const [{ id: profileId }, { id: userId }] = useSelector((state) => [state.profile, state.auth]);
  return profileId === userId ? (
    <NoToolsMaster onClickClose={onClickClose} />
  ) : (
    <NoServicesCustomer onClickClose={onClickClose} />
  );
};

export default NoServices;
