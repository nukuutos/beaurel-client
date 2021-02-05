import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { subServiceSchema } from '../../../utils/schemas';
import asyncCall from '../../../../../utils/async-call';
import { updateSubServiceSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import InputCustom from '../../../../form/input-custom';
import Spinner from '../../../../utils/spinner';
import renderDurationOptions from '../../../utils/render-duration-options';
import Textarea from '../../../../form/textarea';
import Select from '../../../../form/select';
import Input from '../../../../form/input';
import InputIcon from '../../../../form/input-icon';

const EditSubServiceForm = ({ subService, title, isLastService, setIsEdit }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;
  const [{ sessionTime }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.timetable,
    state.auth,
    state.profile,
  ]);

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

        const alert = await asyncCall(dispatch, config);

        if (alert) {
          dispatch(updateSubServiceSuccess({ updatedSubService: { title, ...values } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className={`service service-parameter  ${isLastService ? 'mb-s-4' : ''}`}>
            <div className="service__title">
              {/* <textarea className="textarea--s service__textarea textarea input" type="text" name="title" id="title" />
               */}
              <Textarea className="textarea textarea--s service__textarea input" type="text" name="parameter" />
              <ErrorMessage name="parameter">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
            </div>

            <div className="service__duration service__attribute--edit service-parameter__attribute--edit input--icon">
              <FontAwesomeIcon className="input__icon input__icon--s" icon="clock" />
              <Select className="input input--mini" name="duration" as="select">
                {renderDurationOptions(sessionTime)}
              </Select>
            </div>

            <div className="service__horizontal-line service__horizontal-line--edit mt-1 mb-1" />

            {/* <div className="service__price service__attribute--edit service-parameter__attribute--edit input--icon">
              <FontAwesomeIcon className="input__icon input__icon--s" icon="ruble-sign" />
              <input className="input input--mini" type="text" />
            </div> */}
            <div className="service__price service__price-area">
              <InputIcon
                type="number"
                name="price"
                inputClassName={'input input--mini'}
                wrapperClassName={'input--icon service__attribute--edit'}>
                <FontAwesomeIcon className="input__icon input__icon--s" icon="ruble-sign" />
              </InputIcon>
              {/* 
              <div className="input--icon service__attribute--edit">
                <Input className="input input--mini" type="number" name="price" />
              </div> */}
            </div>
            <ErrorMessage name="price">
              {(msg) => <div className="service__price-area error mt-1">{msg}</div>}
            </ErrorMessage>
            {isSubmitting ? (
              <Spinner className={`spinner--tiny spinner--gc ml-s-4 ${isLastService ? 'mb-s-4' : ''}`} />
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

export default EditSubServiceForm;
