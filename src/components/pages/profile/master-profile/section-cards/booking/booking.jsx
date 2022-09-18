import Modal from '../../../../../base/modal/modal';
import BookingServices from './booking-services/booking-services';
import BookingResult from './booking-result/booking-result';
import BookingSuccess from './booking-success';
import BookingTimetable from './booking-timetable/booking-timetable';
import useBookingState from './hooks/use-booking-state/use-booking-state';

const Booking = ({ isService = false, isTimetable = false, onClickClose }) => {
  const [state, actions] = useBookingState({ isService, isTimetable, onClickClose });

  const { close } = actions;

  return (
    <Modal onClickClose={close}>
      {state.isService && <BookingServices state={state} {...actions} />}
      {state.isTimetable && <BookingTimetable state={state} {...actions} />}
      {state.isResult && <BookingResult state={state} {...actions} />}
      {state.isSuccess && <BookingSuccess {...actions} />}
    </Modal>
  );
};

export default Booking;
