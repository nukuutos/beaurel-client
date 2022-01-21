import Attributes from './attributes/attributes';

const statuses = { confirmed: 'подтверждено', onConfirmation: 'на подтвердении' };

const Appointment = ({ className = '', appointment, isProfile = false, children }) => {
  const { service, user, time, date, status } = appointment;
  const { firstName, lastName, avatar } = user; // it can be master or customer
  const { title, price } = service;
  const { startAt } = time;

  const confirmedClassName = status === 'confirmed' ? 'appointment-card__status--confirmed' : '';

  return (
    <div className={`${className} appointments__appointment-card appointment-card card mt-8`}>
      <div className="appointment-card__header">
        <img
          src={`http://localhost:5000/${avatar}`}
          alt="Avatar"
          className="appointment-card__avatar"
        />
        <span className="appointment-card__name">{`${firstName} ${lastName[0]}.`}</span>
      </div>

      {isProfile && (
        <span className={`appointment-card__status ${confirmedClassName}`}>{statuses[status]}</span>
      )}

      <span className="appointment-card__service">{title}</span>

      <Attributes isProfile={isProfile} date={date} price={price} startAt={startAt} />

      {children}
    </div>
  );
};

export default Appointment;
