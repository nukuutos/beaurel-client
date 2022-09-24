import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BookingService from './booking-service';
import BookingParameterService from './booking-parameter-service';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import getIsSuitableUpdate from './get-is-suitable-update';
import BeforeAfterDate from './before-after-date';
import BackButton from './back-button';

const Services = ({ state, getPickService, servicesSwitcher }) => {
  const { services } = useSelector((state) => state.services);

  return services.map((service) => {
    const props = {
      state,
      service,
      getPickService,
      key: service.title,
      isAfterUpdate: servicesSwitcher === 'after',
    };

    return service.subServices ? (
      <BookingParameterService {...props} />
    ) : (
      <BookingService {...props} />
    );
  });
};

const DisplayServices = ({ state, getPickService, onClickClose, isLoading }) => {
  const [{ services }, { isPhone }] = useSelector((state) => [state.services, state.screenSize]);
  const [servicesSwitcher, setServicesSwitcher] = useState('before'); // before & after update
  const { step } = state;

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}
      <div className="booking-services">
        {isLoading && !isPhone && <div className="spinner-with-background" />}

        {!isPhone && step === 2 && <BackButton onClickClose={onClickClose} />}

        <ModalHeading
          titleDesktopClassName="services__heading booking-services__heading"
          title="Выберите услугу"
          onClickClose={onClickClose}
        />

        {step === 1 && getIsSuitableUpdate(services) && (
          <BeforeAfterDate
            services={services}
            switcherState={[servicesSwitcher, setServicesSwitcher]}
          />
        )}

        <div className="services__container booking-services__container">
          {services.length ? (
            <Services
              state={state}
              getPickService={getPickService}
              servicesSwitcher={servicesSwitcher}
            />
          ) : (
            <p className="">Извините, услуги отсутствуют!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayServices;
