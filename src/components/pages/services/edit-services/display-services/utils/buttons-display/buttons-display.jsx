import { useSelector } from 'react-redux';
import ButtonsDisplayDesktop from './buttons-display-desktop';
import ButtonsDisplayTablet from './buttons-display-tablet';

const ButtonsDisplay = ({ toEditing, deleteService }) => {
  const { isPhone, isTabPort } = useSelector((state) => state.screenSize);

  return isPhone || isTabPort ? (
    <ButtonsDisplayTablet deleteService={deleteService} toEditing={toEditing} />
  ) : (
    <ButtonsDisplayDesktop deleteService={deleteService} toEditing={toEditing} />
  );
};

export default ButtonsDisplay;
