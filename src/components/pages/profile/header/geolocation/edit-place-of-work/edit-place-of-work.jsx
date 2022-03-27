import { Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import City from '../../../../sign-up/cases/city';
import EditPlaceOfWorkForm from './edit-place-of-work-form/edit-place-of-work-form';
import placeOfWorkSchema from './schema';
import useHandleSubmit from './use-handle-submit';

const EditPlaceOfWork = ({ onClickClose }) => {
  const [{ street, house, building, floor, room }, { city }] = useSelector((state) => [
    state.profile.placeOfWork,
    state.timezone,
  ]);

  const [handleSubmit, isLoading] = useHandleSubmit();

  const [isCitySearch, setIsCitySearch] = useState(false);

  const openCity = () => setIsCitySearch(true);
  const closeCity = () => setIsCitySearch(false);

  return (
    <Modal onClickClose={!isCitySearch ? onClickClose : closeCity}>
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
            <City {...props} closeCity={closeCity} />
          ) : (
            <EditPlaceOfWorkForm {...props} openCity={openCity} closeCity={closeCity} />
          )
        }
      </Formik>
    </Modal>
  );
};

export default EditPlaceOfWork;
