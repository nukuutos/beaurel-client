import BookedTime from './booked-time';
import BookingTimetableDesktop from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/booking-timetable-desktop/booking-timetable-desktop';
import useGetHandleClickOnDay from './use-get-handle-click-on-day';

const UpdateDateDesktop = ({ appointment, stepState, onClickClose }) => {
  const [step, setStep] = stepState;
  const getHandleClickOnDay = useGetHandleClickOnDay(setStep);

  return (
    <BookingTimetableDesktop
      step={step}
      getHandleClickOnDay={getHandleClickOnDay}
      onClickClose={onClickClose}
    >
      <BookedTime appointment={appointment} />
    </BookingTimetableDesktop>
  );
};

export default UpdateDateDesktop;
