import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreenSize } from '../redux/screen-size/actions';

const useScreenSize = () => {
  const screenSize = useSelector((state) => state.screenSize);
  const dispatch = useDispatch();

  const memoizedScreenSize = useMemo(
    () => ({
      isPhone: screenSize.isPhone,
      isTabLand: screenSize.isTabLand,
      isTabPort: screenSize.isTabPort,
      isDesktop: screenSize.isDesktop,
    }),
    [screenSize.isPhone, screenSize.isTabLand, screenSize.isTabPort, screenSize.isDesktop]
  );

  const changeDeviceIf = useCallback(
    (isDeviceName, minWidth, maxWidth) => {
      const { innerWidth } = window;

      const isCurrentDevice = memoizedScreenSize[isDeviceName];
      const isAboveMinimum = innerWidth > minWidth;
      const isLessOrEqual = innerWidth <= maxWidth;
      const needToChangeScreenSize = !isCurrentDevice && isAboveMinimum && isLessOrEqual;

      if (needToChangeScreenSize) return dispatch(changeScreenSize({ isDeviceName }));
    },
    [dispatch, memoizedScreenSize]
  );

  const onResize = useCallback(() => {
    changeDeviceIf('isPhone', 0, 600);
    changeDeviceIf('isTabPort', 600, 900);
    changeDeviceIf('isTabLand', 900, 1200);
    changeDeviceIf('isDesktop', 1200, 7680);
  }, [changeDeviceIf]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);
};

export default useScreenSize;
