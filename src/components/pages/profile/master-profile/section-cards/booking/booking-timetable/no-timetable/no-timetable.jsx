import { useSelector } from 'react-redux';
import NoTimetableCustomer from './no-timetable-customer';
import NoToolsMaster from '../../shared/no-tools-master';

const NoTimetable = ({ onClickClose }) => {
  const [{ id: profileId }, { id: userId }] = useSelector((state) => [state.profile, state.auth]);
  return profileId === userId ? (
    <NoToolsMaster onClickClose={onClickClose} />
  ) : (
    <NoTimetableCustomer onClickClose={onClickClose} />
  );
};

export default NoTimetable;
