import { useRef } from 'react';

const useHandleChange = () => {
  const formRef = useRef(null);

  const handleInputChange = (event) => {
    const nextInput = event.target.nextElementSibling;
    const isValue = event.target.value;

    if (nextInput && isValue) {
      nextInput.focus();
    }
  };

  const handleChange = (event) => {
    formRef.current.handleChange(event);
    handleInputChange(event);
  };

  return [handleChange, formRef];
};

export default useHandleChange;
