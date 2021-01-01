import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Spinner from '../../../../utils/spinner';
import EditServices from './edit-services/edit-services';
import ReoderServices from './draggable-services/draggable-services';

// MasterServices means that master has access to edit and reoder his services
const DragAndEditServices = ({ setIsAddService }) => {
  const [isReoder, setIsReoder] = useState(true);
  const { services, isLoading } = useSelector((state) => state.services); // add public view

  return (
    <main className="services services--display">
      {isLoading ? (
        <Spinner className="spinner--gc gc-f" />
      ) : (
        <>
          <h2 className="services__heading gc-f mb-s-5">Services</h2>
          <div className="services__switcher switcher mt-s-1">
            <input
              type="radio"
              defaultChecked={isReoder}
              id="yes"
              name="switcher"
              className="switcher__radio switcher__radio--yes"
            />
            <input
              type="radio"
              defaultChecked={!isReoder}
              id="no"
              name="switcher"
              className="switcher__radio switcher__radio--no"
            />
            <label
              onClick={() => setIsReoder(!isReoder)}
              htmlFor="yes"
              className="switcher__label switcher__label--yes">
              <div className="switcher__text switcher__icon">
                <FontAwesomeIcon icon="pen" />
              </div>
            </label>
            <label onClick={() => setIsReoder(!isReoder)} htmlFor="no" className="switcher__label switcher__label--no">
              <div className="switcher__text switcher__icon switcher__icon--reoder">
                <FontAwesomeIcon icon="stream" />
              </div>
            </label>
          </div>

          {isReoder ? (
            <EditServices services={services} setIsAddService={setIsAddService} />
          ) : (
            <ReoderServices services={services} />
          )}
        </>
      )}
    </main>
  );
};

export default DragAndEditServices;
