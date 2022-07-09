import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import DisplayServices from './display-services/display-services';
import ModalFallback from '../../shared/modal-fallback';
import Plus from '../../../base/icons/plus';
import ChevronRight from '../../../base/icons/chevron-right';

const AddService = dynamic(() => import('./add-service/add-service'), {
  loading: () => <ModalFallback />,
});

const SERVICES_LIMIT = 20;

const EditServices = () => {
  const [isAddService, setIsAddService] = useState(false);

  const openAddService = () => setIsAddService(true);
  const closeAddService = () => setIsAddService(false);

  const { services } = useSelector((state) => state.services);
  const isServices = !!services.length;
  const isServicesLimit = services.length >= SERVICES_LIMIT;

  return (
    <div className="services__container">
      <DisplayServices />

      {!isServicesLimit && isServices && (
        <div className="service service--add service--hover card mt-6" onClick={openAddService}>
          <Plus />
        </div>
      )}

      {!isServices && (
        <div className="masters__no-masters no-master-tools">
          <img
            className="no-master-tools__svg"
            alt="No favorite masters"
            src="/svg/add-service-from-page.svg"
          />

          <p className="no-master-tools__text no-master-tools__text--center mt-9">
            <span onClick={openAddService} className="btn-text btn-text--visit mt-5">
              Добавить услугу <ChevronRight />
            </span>
          </p>
        </div>
      )}

      {isAddService && <AddService onClickClose={closeAddService} />}
    </div>
  );
};

export default EditServices;
