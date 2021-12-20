import useWeek from '../use-week/use-week';
import Arrows from './arrows';
import NoAppointments from './no-appointments';
import useBookingTimetablePhone from './use-booking-timetable-phone';
import BookedTime from '../booked-time';
import ModalHeading from '../../../../../../../../../../../base/modal/modal-heading';

const UpdateDatePhone = ({ stepState, onClickClose }) => {
  const [, setStep] = stepState;

  const [weekDays, setWeekByDate] = useWeek(setStep);

  const [day, isUnavailableWeek, controllers, handlers] = useBookingTimetablePhone(
    weekDays,
    setWeekByDate
  );

  const { toNextWeek } = controllers;

  return (
    <div {...handlers} className="booking-timetable">
      <ModalHeading onClickClose={onClickClose} title="Выберите время" />

      {!isUnavailableWeek && <Arrows controllers={controllers} />}

      <BookedTime />

      {day}

      {!day.props.availableAppointments && !isUnavailableWeek && (
        <p className="booking-timetable__no-appointments">Нет записей</p>
      )}

      {isUnavailableWeek && <NoAppointments toNextWeek={toNextWeek} />}
    </div>
  );
};

export default UpdateDatePhone;
