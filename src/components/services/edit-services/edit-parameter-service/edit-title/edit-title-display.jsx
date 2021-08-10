import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceParameterSuccess } from "../../../../../redux/service/actions/service-parameter";
import { setAlert } from "../../../../../redux/alert/actions";
import Title from "../../../parameter-service/title";
import Spinner from "../../../../utils/spinner";
import useAsyncAction from "../../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../../hooks/use-media-query";

const DesktopButtons = ({ setIsEdit, deleteService, setIsShown }) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShown(false);
          setIsEdit(true);
        }}
        className="service__btn  service__btn--first btn-icon"
      >
        <FontAwesomeIcon icon="pen" />
      </div>
      <div onClick={() => deleteService(title)} className="service__btn btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="trash" />
      </div>
    </>
  );
};

const TabletButtons = ({ setIsEdit, deleteService, setIsShown }) => {
  return (
    <div className="service__mobile-buttons">
      <div onClick={() => deleteService(title)} className="service__btn">
        Удалить
        <FontAwesomeIcon icon="trash" />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShown(false);
          setIsEdit(true);
        }}
        className="service__btn"
      >
        Изменить
        <FontAwesomeIcon icon="pen" />
      </div>
    </div>
  );
};

const EditTitleDisplay = ({ title, setIsEdit, shownState }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery(900);

  const [isShown, setIsShown] = shownState;

  const deleteService = async (title) => {
    const config = {
      method: "delete",
      url: `/master/${profileId}/service-parameter/${title}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceParameterSuccess({ title }));
      dispatch(setAlert(alert));
    }
  };

  const renderButtons = (isTablet, setIsEdit, deleteService) =>
    isTablet ? (
      <TabletButtons setIsEdit={setIsEdit} setIsShown={setIsShown} deleteService={deleteService} />
    ) : (
      <DesktopButtons setIsEdit={setIsEdit} setIsShown={setIsShown} deleteService={deleteService} />
    );

  const classNameService = `service service--edit-mobile service-parameter${isShown ? "--expand" : ""} ${
    !isShown ? "service--hover" : ""
  }`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      <Title shownState={shownState} title={title} />

      {isLoading ? (
        <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
      ) : (
        renderButtons(isTablet, setIsEdit, deleteService)
      )}
    </div>
  );
};

export default EditTitleDisplay;
