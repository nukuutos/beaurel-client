import { useSelector } from 'react-redux';

const Appointment = ({ time, onClick }) => {
  const { isPhone, isTabPort } = useSelector((state) => state.screenSize);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`booking-timetable__appointment ${isPhone || isTabPort ? 'ml-2' : 'ml-5'}`}
    >
      {time}
    </button>
  );
};
export default Appointment;
