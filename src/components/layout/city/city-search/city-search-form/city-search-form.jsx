import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import React from 'react';
import Input from '../../../../base/form/input';
import useHandleSubmit from './use-handle-submit';

const CitySearchForm = ({ setData, page, hasMore, form }) => {
  const [handleSubmit] = useHandleSubmit({ setData, page, hasMore });

  return (
    <Formik innerRef={form} initialValues={{ city: '' }} onSubmit={handleSubmit}>
      {({ submitForm, handleChange }) => {
        const handleType = (event) => {
          handleChange(event);
          submitForm();
        };

        return (
          <Form className="city-search__form mb-1">
            <div className="city-search__bar">
              <span className="label label--primary">Поиск города</span>
              <div className="input--icon">
                <FontAwesomeIcon className="input__icon" icon="search" />
                <Input onChange={handleType} type="text" className="input ml-2" name="city" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CitySearchForm;
