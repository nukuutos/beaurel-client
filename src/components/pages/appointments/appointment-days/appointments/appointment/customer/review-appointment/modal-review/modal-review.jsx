import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

import Modal from '../../../../../../../../base/modal/modal';
import Textarea from '../../../../../../../../base/form/textarea';
import ReviewStars from './review-stars/review-stars';
import useOnSubmit from './use-on-submit';
import reversedRating from './utils/reversed-rating';
import ModalHeading from '../../../../../../../../base/modal/modal-heading';
import getInitialValues from './utils/get-initial-values';
import reviewSchema from './utils/schema';

const ModalReview = ({ onClickClose, appointment }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const { review } = appointment;

  const [handleSubmit, isLoading] = useOnSubmit(appointment, onClickClose);

  const initialValues = getInitialValues(review);

  const loadingClassName = isLoading ? 'btn--submitted btn--spinner' : '';

  return (
    <Modal onClickClose={onClickClose}>
      <section className={`edit-review ${isPhone ? '' : 'card'}`}>
        <ModalHeading title="Отзыв" onClickClose={onClickClose} />
        <Formik
          validationSchema={reviewSchema}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, dirty, submitForm, setFieldValue }) => {
            const setRatingValue = (value) => setFieldValue('value', value);

            const handleClick = (event) => {
              event.preventDefault();
              if (dirty) submitForm();
              else onClickClose();
            };

            return (
              <Form className="edit-review__form">
                <ReviewStars
                  setValue={setRatingValue}
                  value={reversedRating[values.value]}
                  starSize="large"
                />
                <Textarea
                  className="edit-review__textarea textarea mt-7"
                  name="comment"
                  maxLength={500}
                />
                <ErrorMessage name="comment">
                  {(msg) => <div className="error mt-1">{msg}</div>}
                </ErrorMessage>
                <div className="edit-review__counter mt-1">{values.comment.length}/500</div>
                <button
                  onClick={handleClick}
                  type="submit"
                  className={`btn btn--primary mt-6 ${loadingClassName}`}
                >
                  Сохранить
                </button>
              </Form>
            );
          }}
        </Formik>
      </section>
    </Modal>
  );
};

export default ModalReview;
