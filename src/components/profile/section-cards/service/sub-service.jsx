import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteServiceStart, updateServiceStart } from '../../../../redux/service/actions';
import EditSubService from './edit-sub-service';
import DisplaySubService from './display-sub-service';

const SubService = ({ subService, title, isLastService }) => {
  const [isSubServiceEdit, setIsSubServiceEdit] = useState(false);

  return isSubServiceEdit ? (
    <EditSubService
      subService={subService}
      title={title}
      isLastService={isLastService}
      setIsSubServiceEdit={setIsSubServiceEdit}
    />
  ) : (
    <DisplaySubService
      subService={subService}
      isLastService={isLastService}
      setIsSubServiceEdit={setIsSubServiceEdit}
      title={title}
    />
  );
};

export default SubService;
