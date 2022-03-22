import { useRef } from 'react';

const useHandleChange = ({ handleChange: handleChangeFormik }) => {
  const handleInputChange = (event) => {
    const nextInput = event.target.nextElementSibling;
    const isValue = event.target.value;

    if (nextInput && isValue) {
      nextInput.focus();
    }
  };

  const handleChange = (event) => {
    handleChangeFormik(event);
    handleInputChange(event);
  };

  return handleChange;
};

export default useHandleChange;
