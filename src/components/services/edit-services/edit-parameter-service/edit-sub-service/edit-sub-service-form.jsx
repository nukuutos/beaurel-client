import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { subServiceSchema } from '../../../utils/schemas';
import { updateSubServiceSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Spinner from '../../../../utils/spinner';
import renderDurationOptions from '../../../utils/render-duration-options';
import Textarea from '../../../../form/textarea';
import Select from '../../../../form/select';
import InputIcon from '../../../../form/input-icon';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';

const EditSubServiceForm = ({ subService, title, isLastService, setIsEdit }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;
  const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();

  return (
    <Formik
      initialValues={{
        parameter,
        duration,
        price,
        id,
      }}
      validationSchema={subServiceSchema(sessionTime)}
      onSubmit={async (values) => {
        const { date, ...service } = values;

        const config = {
          method: 'put',
          url: `/profile/${profileId}/service/parameter/${title}/sub-service/${id}`,
          data: { date, service },
          accessToken,
        };

        const alert = await asyncAction(dispatch, config);

        if (alert) {
          dispatch(updateSubServiceSuccess({ updatedSubService: { title, ...values } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty, values }) => (
        <>
          <Form className={`service service-parameter  ${isLastService ? 'mb-s-4' : ''}`}>
            <div className="service__title">
              <Textarea className="textarea textarea--s service__textarea input" type="text" name="parameter" />
              <ErrorMessage name="parameter">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
            </div>

            <div className="service__duration service__attribute--edit input--icon">
              <FontAwesomeIcon className="input__icon input__icon--s" icon="clock" />
              <Select value={values.duration} className="input input--mini" name="duration" as="select">
                {renderDurationOptions(sessionTime)}
              </Select>
            </div>

            <div className="service__horizontal-line service__horizontal-line--edit mt-1 mb-1" />

            <div className="service__price service__price-area">
              <InputIcon
                type="number"
                name="price"
                inputClassName={'input input--mini'}
                wrapperClassName={'input--icon service__attribute--edit'}>
                <FontAwesomeIcon className="input__icon input__icon--s" icon="ruble-sign" />
              </InputIcon>
            </div>
            <ErrorMessage name="price">
              {(msg) => <div className="service__price-area error mt-1">{msg}</div>}
            </ErrorMessage>
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

export default EditSubServiceForm;
