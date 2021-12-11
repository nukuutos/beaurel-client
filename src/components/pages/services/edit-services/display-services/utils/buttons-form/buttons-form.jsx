import { useSelector } from 'react-redux';
import ButtonsFormDesktop from './buttons-form-desktop';
import ButtonsFormTablet from './buttons-form-tablet';

const ButtonsForm = ({ setIsEdit, submitForm, dirty }) => {
  const { isTabPort, isPhone } = useSelector((state) => state.screenSize);

  const confirmChanges = () => {
    if (dirty) submitForm();
    else setIsEdit(false);
  };

  const cancelChanges = () => setIsEdit(false);

  return isTabPort || isPhone ? (
    <ButtonsFormTablet confirmChanges={confirmChanges} cancelChanges={cancelChanges} />
  ) : (
    <ButtonsFormDesktop confirmChanges={confirmChanges} cancelChanges={cancelChanges} />
  );
};

export default ButtonsForm;
