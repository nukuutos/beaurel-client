const Appointment = ({ time }) => {
  return (
    <div className="appointment">
      <button className="btn btn--primary">{time}</button>
    </div>
  );
};
export default Appointment;
