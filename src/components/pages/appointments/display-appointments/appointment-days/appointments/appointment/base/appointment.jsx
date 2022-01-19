import Attributes from './attributes/attributes';

const Appointment = ({ className = '', appointment, children }) => {
  const { service, user, time, date } = appointment;
  const { firstName, lastName, avatar } = user; // it can be master or customer
  const { title, price } = service;
  const { startAt } = time;

  return (
    <div className={`${className} appointments__appointment-card appointment-card card mt-8`}>
      <img
        src={`http://localhost:5000/${avatar}`}
        alt="Avatar"
        className="appointment-card__avatar mb-2"
      />
      <span className="appointment-card__name mt-2">{`${firstName} ${lastName[0]}.`}</span>
      <div className="appointment-card__header-line" />

      <span className="appointment-card__service mt-3">{title}</span>

      <Attributes date={date} price={price} startAt={startAt} />

      {children}
    </div>
  );
};

export default Appointment;
