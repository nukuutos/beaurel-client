import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BookingService from './booking-service';
import BookingParameterService from './booking-parameter-service';
import useMediaQuery from '../../../../../hooks/use-media-query';
import ModalHeading from '../../../../utils/modal/modal-heading';
import useGetServices from './use-get-services';
import getIsSuitableUpdate from './get-is-suitable-update';
import BeforeAfterDate from './before-after-date';
import BackButton from './back-button';

const BookingServices = ({ stepState, onClickClose }) => {
  const [{ services }] = useSelector((state) => [state.services]);
  const [servicesSwitcher, setServicesSwitcher] = useState('before'); // before & after update
  const isPhone = useMediaQuery(600);

  const [{ step }] = stepState;

  const [isLoading] = useGetServices();

  const renderServices = () =>
    services.map((service) => {
      const props = {
        stepState,
        service,
        key: service.title,
        isAfterUpdate: servicesSwitcher === 'after',
      };

      return service.subServices ? (
        <BookingParameterService {...props} />
      ) : (
        <BookingService {...props} />
      );
    });

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}
      <div className={`booking-services ${isPhone ? '' : 'card'}`}>
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
          {services.length ? renderServices() : <p className="">Извините, услуги отсутствуют!</p>}
        </div>
      </div>
    </>
  );
};

export default BookingServices;
