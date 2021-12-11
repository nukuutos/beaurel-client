import { useSelector } from 'react-redux';

const EditButton = ({ onClick }) => {
  const [{ isPublicView }, { isPhone }] = useSelector((state) => [state.profile, state.screenSize]);

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
