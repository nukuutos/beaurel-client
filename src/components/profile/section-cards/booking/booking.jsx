import { useState } from 'react';
import Modal from '../../../utils/modal';
import BookingServices from './booking-services/booking-services';
import BookingResult from './booking-result';
import BookingSuccess from './booking-success';
import BookingTimetable from './booking-timetable/booking-timetable';
import { useDispatch } from 'react-redux';
import { unsetAppointment } from '../../../../redux/appointments/actions';

// Booking is used in two component.
// Depended on component it runs, we display firstly ServicesBook or Timetable
const Booking = ({ isService = false, isTimetable = false, onClickClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState({
    isService,
    isTimetable,
    isResult: false,
    isSuccess: false,
    step: 1,
    lastStepName: null,
  });

  return (
    <Modal
      onClickClose={() => {
        onClickClose();
        dispatch(unsetAppointment());
      }}>
      {step.isService && <BookingServices stepState={[step, setStep]} />}
      {step.isTimetable && <BookingTimetable stepState={[step, setStep]} />}
      {step.isResult && <BookingResult setStep={setStep} />}
      {step.isSuccess && <BookingSuccess onClickClose={onClickClose} />}
    </Modal>
  );
};

export default Booking;
