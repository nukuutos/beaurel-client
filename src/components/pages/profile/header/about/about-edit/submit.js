const submit =
  ({ initialValues, values, dirty, submitForm, onClickClose }) =>
  (event) => {
    event.preventDefault();

    const trimmedAboutText = values.aboutText.trim();
    const areValuesEqual = trimmedAboutText === initialValues.aboutText;

    if (dirty && !areValuesEqual) submitForm();
    else onClickClose();
  };

export default submit;
