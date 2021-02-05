import { useField } from 'formik';

const InputIcon = ({ inputClassName, wrapperClassName, children, ...props }) => {
  const [field, meta] = useField(props);

  // const successClass = meta.touched && !meta.error ? ' form__input--success' : '';
  const errorClass = meta.error && meta.touched ? ' input--error' : '';

  wrapperClassName += errorClass;
  // wrapperClassName += successClass;

  return (
    <div className={`input--icon ${wrapperClassName}`}>
      {children}
      <input className={inputClassName} {...field} {...props} />
    </div>
  );
};

export default InputIcon;
