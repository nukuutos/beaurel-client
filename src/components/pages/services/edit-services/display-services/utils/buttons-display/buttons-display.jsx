import useMediaQuery from '../../../../../../../hooks/use-media-query';
import ButtonsDisplayDesktop from './buttons-display-desktop';
import ButtonsDisplayTablet from './buttons-display-tablet';

const ButtonsDisplay = ({ toEditing, deleteService }) => {
  const isTablet = useMediaQuery(900);

  return isTablet ? (
    <ButtonsDisplayTablet deleteService={deleteService} toEditing={toEditing} />
  ) : (
    <ButtonsDisplayDesktop deleteService={deleteService} toEditing={toEditing} />
  );
};

export default ButtonsDisplay;
