import useWeek from '../use-week/use-week';
import Header from './header';
import NoAppointments from './no-appointments';
import BackButton from './back-button';
import useGetDataForBooking from '../use-get-data-for-booking';

const BookingTimetableDesktop = ({ stepState, onClickClose }) => {
  const [{ step }, setStep] = stepState;

  const [weekDays, setDate] = useWeek(setStep);

  const [isLoading] = useGetDataForBooking();

  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  return (
    <div className={`booking-timetable ${step === 2 ? 'booking-timetable--back' : ''} card`}>
      {isLoading && <div className="spinner-with-background" />}

      {step === 2 && <BackButton onClickClose={onClickClose} />}

      <Header setDate={setDate} />

      {weekDays}

      {isUnavailableWeek && <NoAppointments setDate={setDate} />}
    </div>
  );
};

export default BookingTimetableDesktop;
