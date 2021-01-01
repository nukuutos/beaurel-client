import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServicesStart } from '../../../../redux/service/actions';
import Spinner from '../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisabledService from './service/disabled-service';
import DisabledParameterService from './parameter-service/disabled-parameter-service';

const ServicesBook = ({ stepState }) => {
  const { services, isLoading } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const [{ step }, setStep] = stepState;

  useEffect(() => {
    if (!services.length) dispatch(getServicesStart());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner className="spinner--gc gc-f" />
      ) : (
        <main className="services services--display">
          <header className="gc-f mb-s-5">
            {/* arrow back */}
            {step === 2 && (
              <div className="service__icon service__icon--manage service__icon--back">
                <FontAwesomeIcon
                  onClick={() =>
                    setStep((state) => ({ ...state, isTimetable: true, isService: false, step: state.step - 1 }))
                  }
                  icon="long-arrow-alt-left"
                />
              </div>
            )}
            <h2 className="services__heading">Services</h2>
            <span className="week__fraction mr-s-4">{step}/3</span>
          </header>
          {services.length ? (
            services.map((service, i) => {
              return service.subServices ? (
                <DisabledParameterService setStep={setStep} service={service} key={i} />
              ) : (
                // here isBooking property
                <DisabledService setStep={setStep} service={service} key={i} />
              );
            })
          ) : (
            <p className="services__first-service gc-f mb-m mt-s-4">Sorry, no services yet!</p>
          )}
        </main>
      )}
    </>
  );
};

export default ServicesBook;
