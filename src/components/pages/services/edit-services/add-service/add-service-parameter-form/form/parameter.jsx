import { ErrorMessage } from 'formik';
import React from 'react';
import Input from '../../../../../../base/form/input';

const Parameter = ({ name }) => (
  <div className="add-service__title add-service__parameter mt-4">
    <label className="label " htmlFor="title">
      Параметр
    </label>
    <Input className="input" type="text" name={name} id={name} />
    <ErrorMessage name={name}>{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
  </div>
);

export default Parameter;
