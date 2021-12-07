import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const DisplayAboutText = ({ onClick }) => {
  const { isPublicView, aboutText } = useSelector((state) => state.profile);

  return (
    <>
      {aboutText}
      {!isPublicView && (
        <FontAwesomeIcon onClick={onClick} className="profile__edit ml-4" icon="pen" />
      )}
    </>
  );
};

export default DisplayAboutText;
