import { useSelector } from 'react-redux';
import CustomerCard from '../../../base/customer-card/customer-card';
import useGetOnlineStatus from './use-get-online-status';
import useOnlineStatus from './use-online-status';
import useProfile from './use-profile';
import useUserData from './use-user-data';

const ActiveUser = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);

  const { name, avatarUrl } = useUserData();

  const [isCustomerProfile, handleClicks] = useProfile();
  const { openProfile, closeCustomerCard } = handleClicks;

  useGetOnlineStatus(activeInterlocutor._id);

  const status = useOnlineStatus();

  return (
    <>
      {isCustomerProfile && (
        <CustomerCard user={activeInterlocutor} onClickClose={closeCustomerCard} />
      )}
      <div className="messages__active-user active-user">
        <img onClick={openProfile} src={avatarUrl} alt="User" className="active-user__avatar" />
        <div className="active-user__group">
          <h3 onClick={openProfile} className="active-user__name">
            {name}
          </h3>
          <span className="active-user__status">{status}</span>
        </div>
      </div>
    </>
  );
};

export default ActiveUser;
