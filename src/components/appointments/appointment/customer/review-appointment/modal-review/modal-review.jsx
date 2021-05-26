import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../../../utils/modal';
import Textarea from '../../../../../form/textarea';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { upsertAppointmentReview } from '../../../../../../redux/appointments/actions';
import ReviewStars from './review-stars';
import { reversedRating } from './utils';

const ModalReview = ({ onClickClose, appointment }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { review, masterId, _id: appointmentId } = appointment;

  return (
    <Modal onClickClose={onClickClose}>
      <section className="edit-review card">
        <h2 className="edit-review__heading heading">Отзыв</h2>
        <Formik
          enableReinitialize
          initialValues={{ value: review ? review.value : 0, comment: review ? review.comment : '' }}
          onSubmit={async (values) => {
            const config = {
              method: review ? 'put' : 'post',
              url: `master/${masterId}/appointment/${appointmentId}/review/`,
              data: values,
              accessToken,
            };

            const alert = await asyncAction(config);

            if (alert) {
              dispatch(upsertAppointmentReview({ appointmentId, review: { ...values } })); // add work success
              dispatch(setAlert(alert));
              onClickClose();
            }
          }}>
          {({ values, dirty, submitForm, setFieldValue }) => (
            <Form className="edit-review__form">
              <ReviewStars
                setValue={(value) => setFieldValue('value', value)}
                value={reversedRating[values.value]}
                starSize="large"
              />
              <Textarea className="edit-review__textarea textarea mt-7" name="comment" maxLength={500} />
              <div className="edit-review__counter mt-1">{values.comment.length}/500</div>
              <div className="edit-review__button mt-6">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (dirty) submitForm();
                    else onClickClose();
                  }}
                  type="submit"
                  className={`btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''}`}>
                  Сохранить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};

export default ModalReview;
