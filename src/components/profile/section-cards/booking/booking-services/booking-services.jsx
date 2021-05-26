import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingService from './booking-service';
import BookingParameterService from './booking-parameter-service';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { getServicesSuccess } from '../../../../../redux/service/actions/service';
import { unsetAppointmentDate } from '../../../../../redux/appointments/actions';
import { useRouter } from 'next/router';

const BookingServices = ({ stepState }) => {
  const [{ services, masterId }, { id: profileId }] = useSelector((state) => [state.services, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  const [{ step }, setStep] = stepState;

  const getServices = async () => {
    const config = {
      method: 'get',
      url: `/master/${profileId}/service`,
      accessToken: null,
    };

    const { services } = await asyncAction(config);

    if (services) {
      dispatch(getServicesSuccess({ masterId: profileId, services }));
    }
  };

  useEffect(() => {
    const isServices = masterId === router.query.id;

    if (!isServices) getServices();
  }, []);

  return (
    <div className="booking-services card">
      {isLoading && <div className="spinner-with-background" />}

      <h2 className="services__heading heading mt-8">Услуги</h2>

      {step === 2 && (
        <div
          onClick={() => {
            dispatch(unsetAppointmentDate());
            setStep((state) => ({ ...state, isTimetable: true, isService: false, step: state.step - 1 }));
          }}
          className="btn btn--secondary btn--gray booking-services__btn-back">
          Назад
        </div>
      )}

      <div className="services__container">
        {services.length ? (
          services.map((service, i) => {
            return service.subServices ? (
              <BookingParameterService setStep={setStep} service={service} key={i} />
            ) : (
              <BookingService setStep={setStep} service={service} key={i} />
            );
          })
        ) : (
          <p className="">Sorry, no services yet!</p>
        )}
      </div>
    </div>
  );
};

export default BookingServices;
