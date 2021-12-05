import { useState } from 'react';
import Modal from '../../../utils/modal';
import BookingServices from './booking-services/booking-services';
import BookingResult from './booking-result/booking-result';
import BookingSuccess from './booking-success';
import BookingTimetable from './booking-timetable/booking-timetable';
import useCreateBackFunctions from './use-create-back-functions';

const Booking = ({ isService = false, isTimetable = false, onClickClose }) => {
  const [step, setStep] = useState({
    isService,
    isTimetable,
    isResult: false,
    isSuccess: false,
    step: 1,
    lastStepName: null,
  });

  const stepState = [step, setStep];

  const { onClose, closeServices, closeTimetable, backFromBookingResult } = useCreateBackFunctions(
    stepState,
    onClickClose
  );

  return (
    <Modal isMobileBackground onClickClose={onClose}>
      {step.isService && <BookingServices onClickClose={closeServices} stepState={stepState} />}
      {step.isTimetable && <BookingTimetable onClickClose={closeTimetable} stepState={stepState} />}
      {step.isResult && <BookingResult onClickClose={backFromBookingResult} setStep={setStep} />}
      {step.isSuccess && <BookingSuccess onClickClose={onClose} />}
    </Modal>
  );
};

export default Booking;
