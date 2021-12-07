import { useSelector } from 'react-redux';
import useMediaQuery from '../../../../../hooks/use-media-query';

const EditButton = ({ onClick }) => {
  const { isPublicView } = useSelector((state) => state.profile);
  const isPhone = useMediaQuery(600);

  const className = 'btn btn--secondary profile__about-btn';
  const mobileClassName = 'btn btn--secondary btn--flat mt-2';

  return (
    !isPublicView && (
      <button type="button" onClick={onClick} className={isPhone ? mobileClassName : className}>
        О себе...
      </button>
    )
  );
};

export default EditButton;
