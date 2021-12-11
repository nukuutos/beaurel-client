import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from 'formik';
import React, { Fragment } from 'react';
import Input from '../../../../../../base/form/input';
import InputIcon from '../../../../../../base/form/input-icon';
import Select from '../../../../../../base/form/select';
import useDurationOptions from '../../../../hooks/use-duration-options/use-duration-options';

const SubService = ({ subService, remove, index }) => {
  const durationOptions = useDurationOptions();
  const removeSubService = () => remove(index);

  return (
    <>
      <div className="add-service__parameter-and-btn">
        {/* parameter */}
        <div className="add-service__title add-service__parameter mt-4">
          <label className="label " htmlFor="title">
            Параметр
          </label>
          <Input
            className="input"
            type="text"
            name={`subServices.${index}.parameter`}
            id={`subServices.${index}.parameter`}
          />
          <ErrorMessage name={`subServices.${index}.parameter`}>
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        {index !== 0 && (
          <button
            type="button"
            onClick={removeSubService}
            className="add-service__delete btn-icon btn-icon--fail ml-2"
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        )}
      </div>
      {/* duration */}
      <div className="add-service__price-and-duration mt-6">
        <div className="add-service__duration mr-4">
          <label className="label" htmlFor={`subServices.${index}.duration`}>
            Длительность
          </label>
          <div className="input--icon">
            <FontAwesomeIcon className="input__icon input__icon--m" icon="clock" />
            <Select
              value={subService.duration}
              className="input"
              name={`subServices.${index}.duration`}
              as="select"
            >
              {durationOptions}
            </Select>
          </div>
        </div>
        {/* privce */}
        <div className="add-service__price">
          <label className="label " htmlFor={`subServices.${index}.price`}>
            Цена
          </label>
          <InputIcon
            type="number"
            name={`subServices.${index}.price`}
            inputClassName="input ml-1"
            wrapperClassName="input--icon input--mini"
          >
            <FontAwesomeIcon className="input__icon input__icon--m" icon="ruble-sign" />
          </InputIcon>
          <ErrorMessage name={`subServices.${index}.price`}>
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>
      </div>
    </>
  );
};
export default SubService;
