import BookedTime from './booked-time';
import BookingTimetableDesktop from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/booking-timetable-desktop/booking-timetable-desktop';

const UpdateDateDesktop = ({ appointment, state, backToServices, getPickDate }) => {
  const { step } = state;

  return (
    <BookingTimetableDesktop
      step={step}
      getHandleClickOnDay={getPickDate}
      closeTimetable={backToServices}
    >
      <BookedTime appointment={appointment} />
    </BookingTimetableDesktop>
  );
};

export default UpdateDateDesktop;
