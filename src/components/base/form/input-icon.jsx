import { useField } from 'formik';

const InputIcon = ({ inputClassName, wrapperClassName, children, ...props }) => {
  const [field, meta] = useField(props);

  const errorClass = meta.error && meta.touched ? ' input--error' : '';

  wrapperClassName += errorClass;

  return (
    <div className={`input--icon ${wrapperClassName}`}>
      {children}
      <input className={inputClassName} {...field} {...props} autoComplete="off" />
    </div>
  );
};

export default InputIcon;
