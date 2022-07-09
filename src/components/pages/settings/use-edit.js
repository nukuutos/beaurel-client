import { useRef } from 'react';

const useEdit = ({ setIsEdit }) => {
  const formikRef = useRef(null);

  const closeEdit = () => setIsEdit(false);

  const handleEdit = (event) => {
    const { dirty, submitForm } = formikRef.current;

    event.preventDefault();
    if (dirty) submitForm();
    else closeEdit();
  };

  return { formikRef, closeEdit, handleEdit };
};

export default useEdit;
