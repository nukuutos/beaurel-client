import useMediaQuery from '../../../../../../../hooks/use-media-query';
import ButtonsFormDesktop from './buttons-form-desktop';
import ButtonsFormTablet from './buttons-form-tablet';

const ButtonsForm = ({ setIsEdit, submitForm, dirty }) => {
  const isTablet = useMediaQuery(900);

  const confirmChanges = () => {
    if (dirty) submitForm();
    else setIsEdit(false);
  };

  const cancelChanges = () => setIsEdit(false);

  return isTablet ? (
    <ButtonsFormTablet confirmChanges={confirmChanges} cancelChanges={cancelChanges} />
  ) : (
    <ButtonsFormDesktop confirmChanges={confirmChanges} cancelChanges={cancelChanges} />
  );
};

export default ButtonsForm;
