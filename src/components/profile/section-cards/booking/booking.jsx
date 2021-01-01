import { useState } from 'react';
import Modal from '../../../utils/modal';
import ServicesBook from '../services/services-book';
import BookingResult from './booking-result';
import Timetable from '../timetable/timetable';

// Booking is used in two component.
// Depended on component it runs, we display firstly ServicesBook or Timetable
const Booking = ({ isService = false, isTimetable = false, onClickClose }) => {
  const [step, setStep] = useState({ isService, isTimetable, isResult: false, step: 1, lastStepName: null });

  return (
    <Modal onClickClose={onClickClose}>
      {step.isService && <ServicesBook stepState={[step, setStep]} />}
      {step.isTimetable && <Timetable stepState={[step, setStep]} />}
      {step.isResult && <BookingResult setStep={setStep} />}
    </Modal>
  );
};

export default Booking;
