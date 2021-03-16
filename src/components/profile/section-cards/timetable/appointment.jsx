const Appointment = ({ time, onClick }) => {
  return (
    <div onClick={onClick} className="booking-timetable__appointment ml-5">
      {time}
    </div>
  );
};
export default Appointment;
