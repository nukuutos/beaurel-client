import BookingTimetablePhone from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/booking-timetable-phone/booking-timetable-phone';

const UpdateDatePhone = ({ state, backToServices, getPickDate }) => {
  const { step, service } = state;

  return (
    <BookingTimetablePhone
      service={service}
      onClickClose={backToServices}
      step={step}
      getHandleClickOnDay={getPickDate}
    />
  );
};

export default UpdateDatePhone;
