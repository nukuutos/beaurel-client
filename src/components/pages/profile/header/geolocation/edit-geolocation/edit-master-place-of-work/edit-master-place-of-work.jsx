import { Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../../base/modal/modal';
import City from '../city';
import EditMasterPlaceOfWorkForm from './edit-master-place-of-work-form/edit-master-place-of-work-form';
import useHandleSubmit from './use-handle-submit';
import placeOfWorkSchema from '../../../../../schemas/place-of-work';

const EditMasterPlaceOfWork = ({ onClickClose }) => {
  const [{ street, house, building, floor, room }, { city }] = useSelector((state) => [
    state.profile.placeOfWork,
    state.timezone,
  ]);

  const [handleSubmit, isLoading] = useHandleSubmit(onClickClose);

  const [isCitySearch, setIsCitySearch] = useState(false);

  const openCitySearch = () => setIsCitySearch(true);
  const closeCitySearch = () => setIsCitySearch(false);

  return (
    <Modal onClickClose={isCitySearch ? closeCitySearch : onClickClose}>
      <Formik
        validationSchema={placeOfWorkSchema}
        initialValues={{
          city,
          street,
          house,
          floor,
          building,
          room,
        }}
        onSubmit={handleSubmit}
      >
        {(props) =>
          isCitySearch ? (
            <City {...props} closeCity={closeCitySearch} />
          ) : (
            <EditMasterPlaceOfWorkForm
              {...props}
              onClickClose={onClickClose}
              openCity={openCitySearch}
              closeCity={closeCitySearch}
            />
          )
        }
      </Formik>
    </Modal>
  );
};

export default EditMasterPlaceOfWork;
