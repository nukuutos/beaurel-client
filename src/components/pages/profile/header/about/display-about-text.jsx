import { useSelector } from 'react-redux';
import Pen from '../../../../base/icons/pen';

const DisplayAboutText = ({ onClick }) => {
  const { isPublicView, aboutText } = useSelector((state) => state.profile);

  return (
    <>
      {aboutText}
      {!isPublicView && <Pen onClick={onClick} className="profile__edit ml-4" />}
    </>
  );
};

export default DisplayAboutText;
