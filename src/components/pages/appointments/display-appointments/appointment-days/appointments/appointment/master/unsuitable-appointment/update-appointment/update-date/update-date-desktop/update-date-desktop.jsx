import useWeek from '../use-week/use-week';
import Header from './header';
import NoAppointments from './no-appointments';
import BackButton from './back-button';
import BookedTime from '../booked-time';

const UpdateDateDesktop = ({ stepState, onClickClose }) => {
  const [step, setStep] = stepState;

  const [weekDays, setDate] = useWeek(setStep);

  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  return (
    <div className={`booking-timetable ${step === 2 ? 'booking-timetable--back' : ''}`}>
      {step === 2 && <BackButton onClickClose={onClickClose} />}

      <BookedTime />

      <Header setDate={setDate} />

      {weekDays}

      {isUnavailableWeek && <NoAppointments setDate={setDate} />}
    </div>
  );
};

export default UpdateDateDesktop;
