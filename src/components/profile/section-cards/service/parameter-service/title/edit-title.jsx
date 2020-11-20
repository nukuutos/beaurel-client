import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import InputCustom from '../../../../../form/input-custom';
import Spinner from '../../../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import asyncCall from '../../../../../../utils/async-call';
import { updateServiceSuccess } from '../../../../../../redux/service/actions';
import { setAlert } from '../../../../../../redux/alert/actions';
import { titleField } from '../../utils';

const EditTitle = ({ title, setIsEdit }) => {
  const { accessToken } = useSelector((state) => state.auth);
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
          url: `/profile/5eb849b81c2ccc21306ced34/service/${oldTitle}`,
          data: { date, service: { oldTitle, title } },
          accessToken,
        };

        const alert = await asyncCall(dispatch, config);

        if (alert) {
          dispatch(updateServiceSuccess({ updatedService: { oldTitle, title }, updatedServiceType: 'parameter' }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className="service service--edit">
            <span className="service__title service__title--parameter mt-s">
              <InputCustom className="service--edit-title" type="text" name="title" id="title" />
            </span>
          </Form>
          {isSubmitting ? (
            <Spinner className="spinner--tiny spinner--gc ml-s mt-s" />
          ) : (
            <>
              <div
                onClick={() => {
                  if (dirty) submitForm();
                  else setIsEdit(false);
                }}
                className="service__icon service__icon--manage ml-m mt-s">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsEdit(false)} className="service__icon service__icon--manage ml-m mt-s">
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default EditTitle;
