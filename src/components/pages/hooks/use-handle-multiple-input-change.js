import { useRef } from 'react';

// You can directly pass handleChange from formik or
// You can use useRef to pass it in formik form
const useHandleMultipleInputChange = ({ handleChange: handleChangeFormik = null } = {}) => {
  const formRef = useRef(null);

  const handleInputChange = (event) => {
    const nextInput = event.target.nextElementSibling;
    const isValue = event.target.value;

    if (nextInput && isValue) {
      nextInput.focus();
    }
  };

  const handleKeyPress = (event) => {
    const prevInput = event.target.previousElementSibling;
    const isValue = event.target.value;
    const isBackspace = event.key === 'Backspace';

    if (!isValue && isBackspace && prevInput) {
      prevInput.focus();
    }
  };

  const handleChange = (event) => {
    if (formRef.current) formRef.current.handleChange(event);
    else if (handleChangeFormik) handleChangeFormik(event);

    handleInputChange(event);
  };

  return [handleChange, handleKeyPress, formRef];
};

export default useHandleMultipleInputChange;
