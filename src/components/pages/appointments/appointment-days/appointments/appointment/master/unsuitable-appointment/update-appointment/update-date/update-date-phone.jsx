import BookingTimetablePhone from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/booking-timetable-phone/booking-timetable-phone';
import useGetHandleClickOnDay from './use-get-handle-click-on-day';

const UpdateDatePhone = ({ stepState, onClickClose }) => {
  const [step, setStep] = stepState;
  const getHandleClickOnDay = useGetHandleClickOnDay(setStep);

  return (
    <BookingTimetablePhone
      onClickClose={onClickClose}
      step={step}
      getHandleClickOnDay={getHandleClickOnDay}
    />
  );
};

export default UpdateDatePhone;
