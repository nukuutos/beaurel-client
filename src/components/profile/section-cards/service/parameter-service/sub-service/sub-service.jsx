import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteServiceStart, updateServiceStart } from '../../../../../../redux/service/actions';
import EditSubService from './edit-sub-service';
import DisplaySubService from './display-sub-service';

const SubService = ({ subService, title, isLastService }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditSubService subService={subService} title={title} isLastService={isLastService} setIsEdit={setIsEdit} />
  ) : (
    <DisplaySubService subService={subService} title={title} isLastService={isLastService} setIsEdit={setIsEdit} />
  );
};

export default SubService;
