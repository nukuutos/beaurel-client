import useMediaQuery from '../../../../../../../hooks/use-media-query';

const Appointment = ({ time, onClick }) => {
  const isTabPort = useMediaQuery(900);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`booking-timetable__appointment ${isTabPort ? 'ml-2' : 'ml-5'}`}
    >
      {time}
    </button>
  );
};
export default Appointment;
