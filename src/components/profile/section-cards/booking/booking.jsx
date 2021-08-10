import { useState } from "react";
import Modal from "../../../utils/modal";
import BookingServices from "./booking-services/booking-services";
import BookingResult from "./booking-result";
import BookingSuccess from "./booking-success";
import BookingTimetable from "./booking-timetable/booking-timetable";
import { useDispatch } from "react-redux";
import { unsetAppointment } from "../../../../redux/appointments/actions";
import useMediaQuery from "../../../../hooks/use-media-query";
import BookingPhoneTimetable from "./booking-timetable/booking-phone-timetable/booking-phone-timetable";

// Booking is used in two component.
// Depended on component it runs, we display firstly ServicesBook or Timetable
const Booking = ({ isService = false, isTimetable = false, onClickClose }) => {
  const dispatch = useDispatch();
  const isPhone = useMediaQuery(600);
  const [step, setStep] = useState({
    isService,
    isTimetable,
    isResult: false,
    isSuccess: false,
    step: 1,
    lastStepName: null,
  });

  const onClose = () => {
    onClickClose();
    dispatch(unsetAppointment());
  };

  return (
    <Modal isMobileBackground onClickClose={onClose}>
      {step.isService && <BookingServices onClickClose={onClose} stepState={[step, setStep]} />}
      {step.isTimetable &&
        (isPhone ? (
          <BookingPhoneTimetable onClickClose={onClose} stepState={[step, setStep]} />
        ) : (
          <BookingTimetable stepState={[step, setStep]} />
        ))}
      {step.isResult && <BookingResult setStep={setStep} />}
      {step.isSuccess && <BookingSuccess onClickClose={onClose} />}
    </Modal>
  );
};

export default Booking;
