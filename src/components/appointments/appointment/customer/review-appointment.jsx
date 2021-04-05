import React from 'react';
import Appointment from '../appointment';
import Stars from '../../../utils/stars/stars';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncAction from '../../../../hooks/useAsyncAction';

const ReviewAppointment = ({ appointment }) => {
  const { review } = appointment; // do we need id comment and date from review ?

  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncAction, isLoading] = useAsyncAction();

  const sendReview = async () => {
    // const config = {
    //   method: 'put',
    //   url: `/profile/${profileId}/appointment/${_id}/status`,
    //   data: {
    //     status: 'cancelled',
    //   },
    //   accessToken,
    // };
    // const alert = await asyncAction(config);
    // if (alert) {
    //   // dispatch(changeAppointmentStatus({ nextStatus: 'rejected', appointment }));
    //   setAlert(alert);
    // }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        {review ? (
          <div
            onClick={() => sendReview()}
            className={`btn btn--flat btn--secondary ${isLoading ? 'btn--disabled btn--spinner' : ''} 
          `}>
            Изменить отзыв
          </div>
        ) : (
          <div
            onClick={() => sendReview()}
            className={`btn btn--flat btn--primary ${isLoading ? 'btn--disabled btn--spinner' : ''} 
          `}>
            Оставить отзыв
          </div>
        )}
      </div>
    </Appointment>
  );
};

export default ReviewAppointment;
