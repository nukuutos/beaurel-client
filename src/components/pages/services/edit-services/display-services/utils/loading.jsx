import useMediaQuery from '../../../../../../hooks/use-media-query';
import Spinner from '../../../../../base/spinner';

const Loading = () => {
  const isTablet = useMediaQuery(900);

  return isTablet ? (
    <div className="spinner-with-background" />
  ) : (
    <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
  );
};

export default Loading;
