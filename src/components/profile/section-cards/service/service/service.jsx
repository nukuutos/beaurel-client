import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { deleteServiceStart, updateServiceStart, updateServiceSuccess } from '../../../../../redux/service/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import InputCustom from '../../../../form/input-custom';
// import Spinner from '../../../../utils/spinner';
// import { setAlert } from '../../../../../redux/alert/actions';
// import asyncCall from '../../../../../utils/async-call';
import EditService from './edit-service';
import DisplayService from './display-service';

const Service = ({ service }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditService service={service} setIsEdit={setIsEdit} />
  ) : (
    <DisplayService service={service} setIsEdit={setIsEdit} />
  );
};

export default Service;
