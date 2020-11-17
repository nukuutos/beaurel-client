import React, { useState, Fragment } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteServiceStart, updateServiceStart, updateServiceSuccess } from '../../../../../redux/service/actions';
// import * as Yup from 'yup';
// import { Formik, Form } from 'formik';
// import InputCustom from '../../../../form/input-custom';
import SubService from './sub-service/sub-service';
// import asyncCall from '../../../../../utils/async-call';
// import { setAlert } from '../../../../../redux/alert/actions';
// import Spinner from '../../../../utils/spinner';
import Title from './title/title';

const ParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  // const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);

  // const dispatch = useDispatch();

  const { title, subServices } = service;

  return (
    <>
      <Title title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <SubService subService={subService} isLastService={i === subService.length - 1} title={title} key={i} />
          );
        })}
    </>
  );
};

export default ParameterService;
