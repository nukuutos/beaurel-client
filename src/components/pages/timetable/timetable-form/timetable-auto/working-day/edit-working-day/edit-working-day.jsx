import { useSelector } from 'react-redux';
import EditWorkingDayDesktop from './edit-working-day-desktop';
import EditWorkingDayPhone from './edit-working-day-phone';

const EditWorkingDay = ({ handleClicks, ...formikProps }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? (
    <EditWorkingDayPhone {...formikProps} handleClicks={handleClicks} />
  ) : (
    <EditWorkingDayDesktop {...formikProps} handleClicks={handleClicks} />
  );
};

export default EditWorkingDay;
