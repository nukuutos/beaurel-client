import useGetAppointmentData from '../use-get-appointment-data';
import useStartDay from '../use-start-day';
import useWeek from '../use-week/use-week';
import BackButton from './back-button';
import BookingTimetableHeader from './header';
import NoAppointments from './no-appointments';
import useFindFirstAppointment from './use-find-first-appointment';

const BookingTimetableDesktop = ({
  step,
  closeTimetable,
  isLoading,
  children,
  getHandleClickOnDay,
  service,
}) => {
  const [startDayData, setStartDay] = useStartDay();
  const weekDays = useWeek({ startDayData, step, getHandleClickOnDay, service });
  const loadingOnGetAppointments = useGetAppointmentData(startDayData);

  const isBackButton = step === 2;
  const backButtonClassName = isBackButton ? 'booking-timetable--back' : '';
  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  useFindFirstAppointment({ isUnavailableWeek, setStartDay });

  return (
    <div className={`booking-timetable ${backButtonClassName} card`}>
      {(isLoading || loadingOnGetAppointments) && <div className="spinner-with-background" />}
      {isBackButton && <BackButton onClickClose={closeTimetable} />}
      {children}
      <BookingTimetableHeader
        service={service}
        step={step}
        startDateState={[startDayData, setStartDay]}
      />
      {weekDays}
      {isUnavailableWeek && <NoAppointments setDate={setStartDay} />}
    </div>
  );
};

export default BookingTimetableDesktop;
