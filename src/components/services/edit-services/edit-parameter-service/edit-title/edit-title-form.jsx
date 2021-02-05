import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import asyncCall from '../../../../../utils/async-call';
import { updateServiceParameterTitleSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import InputCustom from '../../../../form/input-custom';
import Spinner from '../../../../utils/spinner';
import { titleField } from '../../../utils/schemas';
import Textarea from '../../../../form/textarea';

// import InputCustom from '../../../../../../../form/input-custom';
// import Spinner from '../../../../../../../utils/spinner';
// import asyncCall from '../../../../../../../../utils/async-call';
// import { setAlert } from '../../../../../../../../redux/alert/actions';
// import { titleField } from '../../../../utils/schemas';

const EditTitleForm = ({ title, setIsEdit }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const editTitleSchema = Yup.object().shape({
    title: titleField,
  });

  return (
    <Formik
      initialValues={{
        title,
        oldTitle: title,
        date: null,
      }}
      validationSchema={editTitleSchema}
      onSubmit={async (values) => {
        const { date, oldTitle, title } = values;

        const config = {
          method: 'put',
          url: `/profile/${profileId}/service/parameter/${oldTitle}`,
          data: { date, service: { oldTitle, title } },
          accessToken,
        };

        const alert = await asyncCall(dispatch, config);

        if (alert) {
          dispatch(updateServiceParameterTitleSuccess({ updatedServiceTitles: { oldTitle, title } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className="service service--edit">
            <span className="service__title service-parameter__title">
              <Textarea className="textarea textarea--s service__textarea input" type="text" name="title" />
              <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
            </span>
            <div className={`service-parameter__icon mr-s`}>
              <FontAwesomeIcon icon="caret-left" />
            </div>
            {isSubmitting ? (
              <Spinner className="spinner--tiny spinner--gc ml-s-4" />
            ) : (
              <>
                <div
                  onClick={() => {
                    if (dirty) submitForm();
                    else setIsEdit(false);
                  }}
                  className="service__btn service__btn--first btn--edit btn--hover-success">
                  <FontAwesomeIcon icon="check" />
                </div>
                <div onClick={() => setIsEdit(false)} className="service__btn btn--edit btn--hover-fail">
                  <FontAwesomeIcon icon="times" />
                </div>
              </>
            )}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default EditTitleForm;
