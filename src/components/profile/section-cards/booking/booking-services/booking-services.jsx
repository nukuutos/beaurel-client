import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServicesStart } from '../../../../../redux/service/actions/service';
import Spinner from '../../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookingService from './booking-service';
import BookingParameterService from './booking-parameter-service';

const BookingServices = ({ stepState }) => {
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
        <div className="booking-services card">
          <h2 className="services__heading heading-primary mt-8">Услуги</h2>
          {isLoading ? (
            <Spinner className="spinner--gc gc-f" />
          ) : (
            <>
              {/*arrow back */}
              {/* {step === 2 && (
                <div className="service__icon service__icon--manage service__icon--back">
                  <FontAwesomeIcon
                    
                    icon="long-arrow-alt-left"
                  />
                </div>
              )} */}
              {step === 2 && (
                <div
                  onClick={() =>
                    setStep((state) => ({ ...state, isTimetable: true, isService: false, step: state.step - 1 }))
                  }
                  className="btn btn--secondary btn--gray booking-services__btn-back">
                  Назад
                </div>
              )}

              <div className="services__container">
                {services.length ? (
                  services.map((service, i) => {
                    return (
                      <div key={i} className="service__wrapper card mt-6">
                        {service.subServices ? (
                          <BookingParameterService setStep={setStep} service={service} key={i} />
                        ) : (
                          <BookingService setStep={setStep} service={service} key={i} />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="">Sorry, no services yet!</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BookingServices;
