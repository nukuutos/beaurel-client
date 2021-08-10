import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceSuccess } from "../../../../redux/service/actions/service";
import { setAlert } from "../../../../redux/alert/actions";
import Spinner from "../../../utils/spinner";
import serviceSchema from "../../utils/schemas";
import renderDurationOptions from "../../../profile/section-cards/services/utils/render-duration-options";
import Textarea from "../../../form/textarea";
import Select from "../../../form/select";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import InputIcon from "../../../form/input-icon";
import useMediaQuery from "../../../../hooks/use-media-query";

const DesktopButtons = ({ setIsEdit, submitForm, dirty }) => {
  return (
    <>
      <div
        onClick={() => {
          if (dirty) submitForm();
          else setIsEdit(false);
        }}
        className="service__btn service__btn--first btn-icon btn-icon--success"
      >
        <FontAwesomeIcon icon="check" />
      </div>
      <div onClick={() => setIsEdit(false)} className="service__btn btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

const TabletButtons = ({ setIsEdit, submitForm, dirty }) => {
  return (
    <div className="service__mobile-buttons">
      <div onClick={() => setIsEdit(false)} className="service__btn">
        Отменить
        <FontAwesomeIcon icon="times" />
      </div>
      <div
        onClick={() => {
          if (dirty) submitForm();
          else setIsEdit(false);
        }}
        className="service__btn service__btn--confirm"
      >
        Подтвердить
        <FontAwesomeIcon icon="check" />
      </div>
    </div>
  );
};

const EditServiceForm = ({ service, setIsEdit }) => {
  const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery(900);

  const { title, duration, price, id } = service;

  const renderButtons = (isTablet, setIsEdit, submitForm, dirty) =>
    isTablet ? (
      <TabletButtons setIsEdit={setIsEdit} submitForm={submitForm} dirty={dirty} />
    ) : (
      <DesktopButtons setIsEdit={setIsEdit} submitForm={submitForm} dirty={dirty} />
    );

  return (
    <Formik
      initialValues={{
        title,
        duration,
        price,
        date: null,
      }}
      validationSchema={serviceSchema(sessionTime)}
      onSubmit={async (values) => {
        const { date, ...service } = values;
        const config = {
          method: "put",
          url: `/master/${profileId}/service/${id}`,
          data: { date, service },
          accessToken,
        };
        const alert = await asyncAction(config);
        if (alert) {
          dispatch(updateServiceSuccess({ updatedService: { ...service, id } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}
    >
      {({ submitForm, values, dirty }) => (
        <>
          <Form className="service service--edit-mobile card mt-6">
            <div className="service__side service__side--left">
              <Textarea className="edit-service__textarea textarea input" type="text" name="title" />
              {/* <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage> */}
            </div>

            <div className="service__side service__side--right edit-service__side">
              <div className="edit-service__input input--icon ml-4">
                <FontAwesomeIcon className="input__icon" icon="clock" />
                <Select value={values.duration} className="input" name="duration" as="select">
                  {renderDurationOptions(sessionTime)}
                </Select>
              </div>

              <InputIcon
                type="number"
                name="price"
                inputClassName={"input ml-2"}
                wrapperClassName={"input--icon edit-service__input ml-4"}
              >
                <FontAwesomeIcon className="input__icon" icon="ruble-sign" />
              </InputIcon>
              {/* <ErrorMessage name="price">
                {(msg) => <div className="service__price-area error mt-1">{msg}</div>}
              </ErrorMessage> */}
            </div>

            {isLoading ? (
              <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
            ) : (
              renderButtons(isTablet, setIsEdit, submitForm, dirty)
            )}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default EditServiceForm;
