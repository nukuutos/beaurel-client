import Title from '../../../../base/parameter-service/title';
import getClassName from '../../../../utils/get-title-class-name';

const UpdatedTitle = ({ title, shownState }) => {
  const [isShown, setIsShown] = shownState;

  const classNameService = getClassName(isShown);
  const toggleServiceParameter = () => setIsShown(!isShown);

  return (
    <div onClick={toggleServiceParameter} className={`service ${classNameService}`}>
      <Title shownState={shownState} title={title} />
    </div>
  );
};

export default UpdatedTitle;
