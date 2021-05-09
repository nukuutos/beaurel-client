import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { updateServiceParameterTitleSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Spinner from '../../../../utils/spinner';
import { titleField } from '../../../utils/schemas';
import Textarea from '../../../../form/textarea';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';

const EditTitleForm = ({ title, setIsEdit }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
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

        const alert = await asyncAction(config);

        if (alert) {
          dispatch(updateServiceParameterTitleSuccess({ oldTitle, title }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className="service service--edit">
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

            {isLoading ? (
              <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
            ) : (
              <>
                <div
                  onClick={() => {
                    if (dirty) submitForm();
                    else setIsEdit(false);
                  }}
                  className="service__btn service__btn--first btn-icon btn-icon--success">
                  <FontAwesomeIcon icon="check" />
                </div>
                <div onClick={() => setIsEdit(false)} className="service__btn btn-icon btn-icon--fail">
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
