import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { updateServiceParameterTitleSuccess } from '../../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../../redux/alert/actions';
import Spinner from '../../../../../base/spinner';
import { titleField } from '../../../utils/schemas';
import Textarea from '../../../../../base/form/textarea';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import useMediaQuery from '../../../../../../hooks/use-media-query';

const DesktopButtons = ({ setIsEdit, submitForm, dirty }) => (
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

const TabletButtons = ({ setIsEdit, submitForm, dirty }) => (
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

const EditTitleForm = ({ title, setIsEdit }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery(900);

  const editTitleSchema = Yup.object().shape({
    title: titleField,
  });

  const renderLoading = (isTablet) =>
    isTablet ? (
      <div className="spinner-with-background" />
    ) : (
      <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
    );

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
        oldTitle: title,
      }}
      validationSchema={editTitleSchema}
      onSubmit={async (values) => {
        const { oldTitle, title } = values;

        const config = {
          method: 'put',
          url: `/master/${profileId}/service-parameter/${oldTitle}`,
          data: values,
          accessToken,
        };

        const alert = await asyncAction(config);

        if (alert) {
          dispatch(updateServiceParameterTitleSuccess(values));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}
    >
      {({ submitForm, isSubmitting, dirty }) => (
        <Form className="service service--edit-mobile service--edit">
          <div className="service__side service__side--left">
            <Textarea className="edit-service__textarea textarea input" type="text" name="title" />
            {/* <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage> */}
          </div>

          <div className="service__side service__side--right">
            {/* <div className={`service-parameter__icon ${isShown ? 'service-parameter__icon--rotated' : ''}`}> */}
            <div className={`service-parameter__icon `}>
              <FontAwesomeIcon icon="caret-left" />
            </div>
          </div>

          {isLoading
            ? renderLoading(isTablet)
            : renderButtons(isTablet, setIsEdit, submitForm, dirty)}
        </Form>
      )}
    </Formik>
  );
};

export default EditTitleForm;
