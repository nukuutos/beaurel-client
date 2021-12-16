import { useSelector } from 'react-redux';
import EditWorkingDayDesktop from './edit-working-day-desktop';
import EditWorkingDayPhone from './edit-working-day-phone';

const EditWorkingDay = ({ handleClicks }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? (
    <EditWorkingDayPhone handleClicks={handleClicks} />
  ) : (
    <EditWorkingDayDesktop handleClicks={handleClicks} />
  );
};

export default EditWorkingDay;
