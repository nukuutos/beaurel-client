import { useSelector } from 'react-redux';

const useIsTabView = () => {
  const { isDesktop } = useSelector((state) => state.screenSize);
  return !isDesktop;
};

export default useIsTabView;
