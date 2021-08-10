import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteSubServiceSuccess } from "../../../../../redux/service/actions/service-parameter";
import { setAlert } from "../../../../../redux/alert/actions";
import Spinner from "../../../../utils/spinner";
import SubService from "../../../parameter-service/sub-service";
import useAsyncAction from "../../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../../hooks/use-media-query";

const DesktopButtons = ({ setIsEdit, deleteService }) => {
  return (
    <>
      <div onClick={() => setIsEdit(true)} className="service__btn  service__btn--first btn-icon">
        <FontAwesomeIcon icon="pen" />
      </div>
      <div onClick={() => deleteService(id)} className="service__btn btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="trash" />
      </div>
    </>
  );
};

const TabletButtons = ({ setIsEdit, deleteService }) => {
  return (
    <div className="service__mobile-buttons">
      <div onClick={() => deleteService(id)} className="service__btn">
        Удалить
        <FontAwesomeIcon icon="trash" />
      </div>
      <div onClick={() => setIsEdit(true)} className="service__btn">
        Изменить
        <FontAwesomeIcon icon="pen" />
      </div>
    </div>
  );
};

const EditSubServiceDisplay = ({ onMouseEnter, onMouseLeave, subService, setIsEdit, title }) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const isTablet = useMediaQuery(900);

  const dispatch = useDispatch();
  const { id } = subService;

  const deleteService = async () => {
    const config = {
      method: "delete",
      url: `/master/${profileId}/service-parameter/${title}/sub-service/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteSubServiceSuccess({ id, title }));
      dispatch(setAlert(alert));
    }
  };

  const renderButtons = (isTablet, setIsEdit, deleteService) =>
    isTablet ? (
      <TabletButtons setIsEdit={setIsEdit} deleteService={deleteService} />
    ) : (
      <DesktopButtons setIsEdit={setIsEdit} deleteService={deleteService} />
    );

  return (
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`service service--hover service--edit-mobile service-parameter__sub-service`}
      >
        <SubService subService={subService} />
        {isLoading ? (
          <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
        ) : (
          renderButtons(isTablet, setIsEdit, deleteService)
        )}
      </div>
    </>
  );
};

export default EditSubServiceDisplay;
