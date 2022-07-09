import Image from 'next/image';
import CustomerCard from '../../../../../../base/customer-card/customer-card';
import getAvatarPath from '../../../../../utils/get-avatar-path';
import Attributes from './attributes/attributes';
import Status from './status';
import useProfile from './use-profile';
import useSetViewed from './use-set-viewed';

const Appointment = ({
  user: userType,
  className = '',
  appointment,
  isProfile = false,
  lastAppointmentRef,
  children,
}) => {
  const { service, user, time, date, status, isViewed, isSocket, _id: appointmentId } = appointment;
  const { firstName, lastName, isAvatar, _id } = user;
  const { title, price } = service;
  const { startAt } = time;

  const isNew = !isViewed[userType];

  const [isCustomerProfile, handleClicks] = useProfile(user);

  const { openProfile, closeCustomerCard } = handleClicks;

  useSetViewed({ userType, userId: _id, appointmentId, isSocket });

  return (
    <>
      {isCustomerProfile && <CustomerCard user={user} onClickClose={closeCustomerCard} />}
      <div
        ref={lastAppointmentRef}
        className={`${className} appointments__appointment-card appointment-card card mt-8`}
      >
        <div onClick={openProfile} className="appointment-card__header">
          <div className="appointment-card__avatar">
            <Image
              layout="fill"
              src={getAvatarPath(_id, isAvatar)}
              alt="Avatar"
              className="appointment-card__image"
              sizes="36px"
            />
          </div>
          <span className="appointment-card__name">{`${firstName} ${lastName[0]}.`}</span>
        </div>

        {isNew && <span className="appointment-card__new">new</span>}
        {isProfile && <Status statusData={status} />}
        <span className="appointment-card__service">{title}</span>
        <Attributes isProfile={isProfile} date={date} price={price} startAt={startAt} />
        {children}
      </div>
    </>
  );
};

export default Appointment;
