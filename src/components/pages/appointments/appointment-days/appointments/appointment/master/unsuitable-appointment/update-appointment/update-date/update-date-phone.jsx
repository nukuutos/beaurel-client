import BookingTimetablePhone from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/booking-timetable-phone/booking-timetable-phone';

const UpdateDatePhone = ({ stepState, backToServices, getPickDate }) => {
  const { step } = stepState;

  return (
    <BookingTimetablePhone
      onClickClose={backToServices}
      step={step}
      getHandleClickOnDay={getPickDate}
    />
  );
};

export default UpdateDatePhone;
