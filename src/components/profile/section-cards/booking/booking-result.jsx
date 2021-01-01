import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../utils/modal';
import { useSelector, useDispatch } from 'react-redux';
import displayDuration from '../services/utils/display-duration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import asyncCall from '../../../../utils/async-call';
import Spinner from '../../../utils/spinner';
import { setAlert } from '../../../../redux/alert/actions';

const BookingResult = ({ setStep }) => {
  const [{ date, time, service }, { accessToken, id: profileId }] = useSelector((state) => [
    state.appointments.bookingAppointment,
    state.auth,
  ]);
  const isCancelled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const config = {
      method: 'post',
      url: `/profile/${profileId}/appointment`,
      data: { serviceId: service.id, time: { startAt: time, endAt: time + service.duration }, date },
      accessToken,
    };

    setIsLoading(true);

    const alert = await asyncCall(dispatch, config);

    if (alert) {
      // const { ids, ...alert } = data;
      // dispatch(addServiceSuccess({ service: { ids, ...service } }));
      dispatch(setAlert(alert));
    }

    if (!isCancelled.current) setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return (
    <Modal>
      <main className="services services--display">
        <header className="gc-f mb-s-5">
          <div
            onClick={() =>
              setStep((state) => {
                if (state.lastStepName === 'service') {
                  return { ...state, isResult: false, isService: true, step: state.step - 1 };
                }
                return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
              })
            }
            className="service__icon service__icon--manage service__icon--back">
            <FontAwesomeIcon icon="long-arrow-alt-left" />
          </div>
          <h2 className="services__heading">Booking Result</h2>
          <span className="week__fraction mr-s-4">3/3</span>
        </header>
        Date: {date.getDay()}
        Time: {displayDuration(time)}
        Service: {service.title} {service.duration}
        <div className="mt-s-5 mb-s-2 display-flex gc-f p-r ">
          {isLoading && <Spinner className="spinner--edge spinner--tiny" />}
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className={`w-f btn btn--secondary ${isLoading ? 'btn--submited' : ''}`}
            type="submit">
            Save
          </button>
        </div>
      </main>
    </Modal>
  );
};

export default BookingResult;
