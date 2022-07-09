import { ErrorMessage } from 'formik';
import Input from './input';

const ErrorInput = ({ className, name, label, type = 'text' }) => (
  <div className={className}>
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <Input className="input" name={name} id={name} type={type} />
    <ErrorMessage name={name}>{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
  </div>
);

export default ErrorInput;
