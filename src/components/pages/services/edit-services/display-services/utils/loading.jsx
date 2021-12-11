import { useSelector } from 'react-redux';
import Spinner from '../../../../../base/spinner';

const Loading = () => {
  const { isPhone, isTabPort } = useSelector((state) => state.screenSize);

  return isPhone || isTabPort ? (
    <div className="spinner-with-background" />
  ) : (
    <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
  );
};

export default Loading;
