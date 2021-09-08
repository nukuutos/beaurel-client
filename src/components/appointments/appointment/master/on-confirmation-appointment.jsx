import React from "react";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import { useSelector, useDispatch } from "react-redux";
import { changeAppointmentStatus } from "../../../../redux/appointments/actions";
import { setAlert } from "../../../../redux/alert/actions";
import Appointment from "../appointment";

const OnConfirmationAppointment = ({ appointment }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncActionConfirmation, isConfirmationLoading] = useAsyncAction();
  const [asyncActionRejection, isRejectionLoading] = useAsyncAction();

  const confirm = async () => {
    const config = {
      method: "put",
      url: `/profile/${profileId}/appointment/${_id}/status/master`,
      data: {
        status: "confirmed",
      },
      accessToken,
    };

    const alert = await asyncActionConfirmation(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: "confirmed", appointment, user: "master" }));
      dispatch(setAlert(alert));
    }
  };

  const reject = async () => {
    const config = {
      method: "put",
      url: `/profile/${profileId}/appointment/${_id}/status`,
      data: {
        status: "rejected",
      },
      accessToken,
    };

    const alert = await asyncActionRejection(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: "rejected", appointment }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={() => confirm()}
          className={`btn btn--primary btn--flat mr-4 ${
            isConfirmationLoading || isRejectionLoading ? "btn--disabled" : ""
          } ${isConfirmationLoading ? "btn--spinner" : ""}`}
        >
          Подтвердить
        </div>
        <div
          onClick={() => reject()}
          className={`btn btn--secondary btn--flat btn--fail ${
            isConfirmationLoading || isRejectionLoading ? "btn--disabled" : ""
          } 
          ${isRejectionLoading ? "btn--spinner" : ""}`}
        >
          Отклонить
        </div>
      </div>
    </Appointment>
  );
};

export default OnConfirmationAppointment;
