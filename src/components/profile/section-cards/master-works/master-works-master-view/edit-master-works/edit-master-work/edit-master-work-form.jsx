import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { updateWorkSuccess } from '../../../../../../../redux/work/actions';
import { setAlert } from '../../../../../../../redux/alert/actions';
import InputCustom from '../../../../../../form/input-custom';
import Spinner from '../../../../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { workSchema } from '../../../utils/schemas';
import { useSelector, useDispatch } from 'react-redux';

const EditMasterWorkForm = ({ work, setIsEdit }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);

  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const { _id, title } = work;

  return (
    <div>
      <Formik
        initialValues={{
          title,
        }}
        validationSchema={workSchema}
        onSubmit={async (values) => {
          const { title } = values;

          const config = {
            method: 'put',
            url: `/profile/${profileId}/work/${_id}`,
            data: values,
            accessToken,
          };

          const alert = await asyncAction(config);

          if (alert) {
            dispatch(updateWorkSuccess({ updatedWork: { _id, title } })); // add work success
            dispatch(setAlert(alert));
            // resetForm();
            setIsEdit(false);
          }
        }}>
        {({ isSubmitting, dirty, isValidating, values, submitForm }) => (
          <Form className="master-works__form">
            <InputCustom placeholder="Title" className="master-works__input" type="text" name="title" id="title" />

            <div className="master-works__icons">
              {isSubmitting ? (
                <Spinner className="spinner--tiny spinner--gc ml-s-4" />
              ) : (
                <>
                  <div
                    onClick={() => {
                      if (dirty) submitForm();
                      else setIsEdit(false);
                    }}
                    className="master-works__trash">
                    <FontAwesomeIcon icon="check" />
                  </div>
                  <div onClick={() => setIsEdit(false)} className="master-works__trash ml-s-4">
                    <FontAwesomeIcon icon="times" />
                  </div>
                </>
              )}
            </div>

            <ErrorMessage name="title">{(msg) => <div className="master-works__error">{msg}</div>}</ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditMasterWorkForm;
