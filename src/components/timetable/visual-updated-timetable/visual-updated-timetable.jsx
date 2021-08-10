import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import VisualUpdatedTimetableAuto from "./visual-updated-timetable-auto";
import VisualUpdatedTimetableManually from "./visual-updated-timetable-manually";
import useAsyncAction from "../../../hooks/use-async-action/use-async-action";
import Modal from "../../utils/modal";
import { unsetTimetableUpdate } from "../../../redux/timetable/actions";
import { deleteServicesUpdate } from "../../../redux/service/actions/service";
import { setAlert } from "../../../redux/alert/actions";
import convertDateToString from "../../profile/section-cards/booking/booking-timetable/utils/convert-date-to-string";
import useMediaQuery from "../../../hooks/use-media-query";
import ModalHeading from "../../utils/modal/modal-heading";

const VisualUpdatedTimetable = () => {
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [{ accessToken, id: profileId }, servicesState, { _id: timetableId, update }] = useSelector((state) => [
    state.auth,
    state.services,
    state.timetable,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const { date } = update;
  const isPhone = useMediaQuery(600);

  const deleteTimetableUpdate = async () => {
    const config = {
      method: "delete",
      url: `/master/${profileId}/timetable/${timetableId}/update`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      // services' update to null
      if (servicesState.services.length && servicesState.masterId === profileId) {
        dispatch(deleteServicesUpdate());
      }
      dispatch(unsetTimetableUpdate());
      dispatch(setAlert(alert));
    }
  };

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading">
        Расписание {isPhone && <br />}c {convertDateToString(new Date(date))}{" "}
      </div>
      <div
        onClick={() => setIsConfirmation(true)}
        className={`timetable-card__delete-btn btn btn--secondary btn--flat btn--fail `}
      >
        Отменить
      </div>
      <div className="timetable-visual mt-4">
        {update.type === "auto" ? (
          <VisualUpdatedTimetableAuto update={update} />
        ) : (
          <VisualUpdatedTimetableManually update={update} />
        )}
      </div>
      {isConfirmation && (
        <Modal isMobileBackground onClickClose={() => setIsConfirmation(false)}>
          <div className={`update-cancellation ${isPhone ? "" : "card"}`}>
            {/* <div className="update-cancellation__heading heading">Предупреждение</div> */}
            <ModalHeading title="Предупреждение" onClickClose={() => setIsConfirmation(false)} />
            <p className="update-cancellation__text">Вы действительно хотите отменить обновление?</p>

            <div className="update-cancellation__buttons mt-8">
              <div
                onClick={() => setIsConfirmation(false)}
                className={`btn ${isLoading ? "btn--disabled" : ""} btn--secondary btn--gray mr-4`}
              >
                Назад
              </div>
              <div
                onClick={() => deleteTimetableUpdate()}
                className={`btn btn--primary btn--fail ${isLoading ? "btn--disabled btn--spinner" : ""} `}
              >
                Отменить
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VisualUpdatedTimetable;
