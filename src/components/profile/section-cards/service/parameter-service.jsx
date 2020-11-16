import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteServiceStart, updateServiceStart } from '../../../../redux/service/actions';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputCustom from '../../../form/input-custom';
import SubService from './sub-service';

const ParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const dispatch = useDispatch();

  const { title, subServices } = service;

  const editTitleSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(3, 'Minimum length is 3 characters')
      .max(30, 'Maximum length is 30 characters')
      .required('Field is required'),
  });

  return (
    <>
      {isTitleEdit ? (
        <Formik
          initialValues={{
            title,
            oldTitle: title,
          }}
          validationSchema={editTitleSchema}>
          {({ values }) => (
            <>
              <Form className="service service--edit">
                <span className="service__cell service__title service__title--parameter">
                  <InputCustom className="service--edit-title" type="text" name="title" id="title" />
                </span>
              </Form>
              <div
                onClick={() => dispatch(updateServiceStart({ service: values, date: null, type: 'parameter' }))}
                className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsTitleEdit(false)} className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </Formik>
      ) : (
        <>
          <span
            onClick={() => setIsShown(!isShown)}
            className={`service__cell service__title service__title--parameter ${
              !isShown ? 'service__title--hidden-parameters' : ''
            }`}>
            <div className="service__icon mr-s">
              <FontAwesomeIcon
                className={`service__icon--reveal ${isShown ? 'service__icon--reveal-rotated' : ''}`}
                icon="caret-right"
              />
            </div>
            {title}
          </span>
          <div onClick={() => setIsTitleEdit(true)} className="service__icon service__icon--manage">
            <FontAwesomeIcon className="service__manage-icon " icon="pen" />
          </div>
          <div
            onClick={() => dispatch(deleteServiceStart({ type: 'parameter', service: { title } }))}
            className="service__icon service__icon--manage">
            <FontAwesomeIcon className="service__manage-icon" icon="trash" />
          </div>
        </>
      )}

      {isShown &&
        subServices.map((subService, i) => {
          // const { parameter, duration, price, id } = subService;
          return (
            <SubService subService={subService} isLastService={i === subService.length - 1} title={title} key={i} />
          );
          // const [isSubServiceEdit, setIsSubServiceEdit] = useState(false);

          // return isSubServiceEdit ? (
          //   <Formik
          //     initialValues={{
          //       parameter,
          //       duration,
          //       price,
          //       id,
          //     }}
          //     validationSchema={editSubServiceSchema}
          //     onSubmit={(values) => console.log('sent')}>
          //     {({ values }) => (
          //       <>
          //         <Form className="service service--edit">
          //           <span
          //             className={`service__cell service__parameter ${
          //               i === subServices.length - 1 ? 'service__parameter--last-parameter' : ''
          //             }`}>
          //             <InputCustom className="service--edit-title" type="text" name="parameter" id="parameter" />
          //           </span>
          //           <span className="service__cell service__duration">
          //             <InputCustom type="number" name="duration" id="duration" />
          //           </span>
          //           <span
          //             className={`service__cell service__price service__price--parameter ${
          //               i === subServices.length - 1 ? 'service__price--last-parameter' : ''
          //             }`}>
          //             <InputCustom className="service__cell service__price" type="text" name="price" id="price" />
          //           </span>
          //         </Form>
          //         <div
          //           onClick={() => dispatch(updateServiceStart({ service: values, date: null, type: 'service' }))}
          //           className="service__icon service__icon--manage">
          //           <FontAwesomeIcon icon="check" />
          //         </div>
          //         <div onClick={() => setIsSubServiceEdit(false)} className="service__icon service__icon--manage">
          //           <FontAwesomeIcon icon="times" />
          //         </div>
          //       </>
          //     )}
          //   </Formik>
          // ) : (
          //   <Fragment key={i}>
          //     <div className="service">
          //       <span
          //         className={`service__cell service__parameter ${
          //           i === subServices.length - 1 ? 'service__parameter--last-parameter' : ''
          //         }`}>
          //         {parameter}
          //       </span>
          //       <span className="service__cell service__duration">{duration}</span>
          //       <span
          //         className={`service__cell service__price service__price--parameter ${
          //           i === subServices.length - 1 ? 'service__price--last-parameter' : ''
          //         }`}>
          //         {price}
          //       </span>
          //     </div>
          //     <div onClick={() => setIsSubServiceEdit(true)} className="service__icon service__icon--manage">
          //       <FontAwesomeIcon icon="pen" />
          //     </div>
          //     <div
          //       onClick={() => dispatch(deleteServiceStart({ type: 'sub-service', service: { id, title } }))}
          //       className="service__icon service__icon--manage">
          //       <FontAwesomeIcon icon="times" />
          //     </div>
          //   </Fragment>
          // );
        })}
    </>
  );
};

export default ParameterService;
