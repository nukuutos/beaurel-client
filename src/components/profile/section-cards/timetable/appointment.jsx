const Appointment = ({ time, onClick }) => {
  return (
    <div onClick={onClick} className="appointment">
      <button className="btn btn--primary">{time}</button>
    </div>
  );
};
export default Appointment;
