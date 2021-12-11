const getFormClassName = (subServices) => {
  let formClassName = 'add-service__form ';
  if (subServices.length !== 1) formClassName += 'add-service__form--sub-service';
  return formClassName;
};

export default getFormClassName;
