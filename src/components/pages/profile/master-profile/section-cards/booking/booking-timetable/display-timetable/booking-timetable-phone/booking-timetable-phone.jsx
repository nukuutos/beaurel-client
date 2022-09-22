import useGetAppointmentData from '../use-get-appointment-data';
import useWeek from '../use-week/use-week';
import Arrows from './arrows';
import Header from './header';
import NoAppointments from './no-appointments';
import useBookingTimetablePhone from './use-booking-timetable-phone';
import useStartDay from '../use-start-day';
import useFindFirstAppointment from './use-find-first-appointment';

const BookingTimetablePhone = ({
  step,
  service,
  getHandleClickOnDay,
  closeTimetable,
  isLoading,
}) => {
  const [startDayData, setStartDay] = useStartDay();
  const [weekdayIndex, controllers] = useBookingTimetablePhone(setStartDay);
  const weekDays = useWeek({ startDayData, step, getHandleClickOnDay, service });
  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);
  const day = weekDays[weekdayIndex];

  const loadingOnGetAppointments = useGetAppointmentData(startDayData);

  useFindFirstAppointment({ day, toNextDay: controllers.toNextDay, weekdayIndex });

  return (
    <>
      {(isLoading || loadingOnGetAppointments) && <div className="spinner-with-background" />}
      <div className="booking-timetable">
        <Header setDate={setStartDay} onClickBack={closeTimetable} />
        {!isUnavailableWeek && (
          <Arrows
            service={service}
            step={step}
            startDayData={startDayData}
            day={day}
            controllers={controllers}
          />
        )}
        {day}
        {!day.props.availableAppointments && !isUnavailableWeek && (
          <p className="booking-timetable__no-appointments">Нет записей</p>
        )}
        {isUnavailableWeek && <NoAppointments toNextWeek={controllers.toNextWeek} />}
      </div>
    </>
  );
};

export default BookingTimetablePhone;
