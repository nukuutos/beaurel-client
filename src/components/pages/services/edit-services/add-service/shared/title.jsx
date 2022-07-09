import { ErrorMessage } from 'formik';
import React from 'react';
import Input from '../../../../../base/form/input';

const Title = ({ className }) => (
  <div className={className}>
    <label className="label" htmlFor="title">
      Название
    </label>
    <Input className="input" type="text" name="title" id="title" />
    <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
  </div>
);

export default Title;
