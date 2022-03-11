import useGetAppointmentData from '../use-get-appointment-data';
import useStartDay from './use-start-day';
import useWeek from '../use-week/use-week';
import BackButton from './back-button';
import BookingTimetableHeader from './header';
import NoAppointments from './no-appointments';

const BookingTimetableDesktop = ({
  step,
  onClickClose,
  isLoading,
  children,
  getHandleClickOnDay,
}) => {
  const [startDayData, setStartDay] = useStartDay();

  const weekDays = useWeek({ startDayData, step, getHandleClickOnDay });

  const loadingOnGetAppointments = useGetAppointmentData(startDayData);

  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  const isBackButton = step === 2;

  const backButtonClassName = isBackButton ? 'booking-timetable--back' : '';

  return (
    <div className={`booking-timetable ${backButtonClassName} card`}>
      {(isLoading || loadingOnGetAppointments) && <div className="spinner-with-background" />}
      {isBackButton && <BackButton onClickClose={onClickClose} />}
      {children}
      <BookingTimetableHeader step={step} startDateState={[startDayData, setStartDay]} />
      {weekDays}
      {isUnavailableWeek && <NoAppointments setDate={setStartDay} />}
    </div>
  );
};

export default BookingTimetableDesktop;
