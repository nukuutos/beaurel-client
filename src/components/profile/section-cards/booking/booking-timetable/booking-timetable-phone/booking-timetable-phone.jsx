import useWeek from '../use-week/use-week';
import Arrows from './arrows';
import NoAppointments from './no-appointments';
import Header from './header';
import useBookingTimetablePhone from './use-booking-timetable-phone';
import useGetDataForBooking from '../use-get-data-for-booking';

const BookingTimetablePhone = ({ stepState, onClickClose }) => {
  const [, setStep] = stepState;

  const [weekDays, setWeekByDate] = useWeek(setStep);

  const [isLoading] = useGetDataForBooking();

  const [day, isUnavailableWeek, controllers, handlers] = useBookingTimetablePhone(
    weekDays,
    setWeekByDate
  );

  const { toNextWeek } = controllers;

  return (
    <>
      {isLoading && <div className="spinner-with-background" />}
      <div {...handlers} className="booking-timetable">
        <Header onClickBack={onClickClose} />

        {!isUnavailableWeek && <Arrows controllers={controllers} />}

        {day}

        {!day.props.availableAppointments && !isUnavailableWeek && (
          <p className="booking-timetable__no-appointments">Нет записей</p>
        )}

        {isUnavailableWeek && <NoAppointments toNextWeek={toNextWeek} />}
      </div>
    </>
  );
};

export default BookingTimetablePhone;
