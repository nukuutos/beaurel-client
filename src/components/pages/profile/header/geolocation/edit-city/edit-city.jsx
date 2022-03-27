import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import CityEdit from '../edit-place-of-work/city';
import useHandleSubmit from '../edit-place-of-work/use-handle-submit';

const EditCity = ({ onClickClose }) => {
  const { city } = useSelector((state) => state.timezone);
  const [handleSubmit, isLoading] = useHandleSubmit();

  return (
    <Modal onClickClose={onClickClose}>
      <Formik initialValues={{ city }} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => <CityEdit values={values} setFieldValue={setFieldValue} />}
      </Formik>
    </Modal>
  );
};

export default EditCity;
