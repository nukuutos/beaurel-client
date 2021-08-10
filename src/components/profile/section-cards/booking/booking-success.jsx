import React from "react";
import { unsetAppointment } from "../../../../redux/appointments/actions";
import { useDispatch } from "react-redux";
import useMediaQuery from "../../../../hooks/use-media-query";
import ModalHeading from "../../../utils/modal/modal-heading";

const BookingSuccess = ({ onClickClose }) => {
  const dispatch = useDispatch();
  const isPhone = useMediaQuery(600);

  return (
    <div className={`booking-success ${isPhone ? "" : "card"}`}>
      {/* <h2 className="booking-success__heading heading heading--modal">Успех</h2> */}
      <ModalHeading title="Успех" />
      <img className="booking-success__svg mt-8" src="/svg/success.svg" alt="Appointment image" />

      <p className="booking-success__text mt-6">
        После подверждения записи мастером Вам придёт уведомление и СМС на Ваш номер телефона.
      </p>

      <button
        onClick={() => {
          onClickClose();
          dispatch(unsetAppointment());
        }}
        className={`booking-success__button btn btn--primary mt-6`}
        type="submit"
      >
        Завершить
      </button>
    </div>
  );
};

export default BookingSuccess;
