import { useCallback, useEffect } from 'react';
import useKeys from '../../../../../../hooks/use-keys';

const useWeekendsKeys = (handleClicks) => {
  const [handleEdit, handleCancel] = handleClicks;

  const keys = useCallback(
    () => [
      { key: 'Enter', fn: handleEdit },
      { key: 'Escape', fn: handleCancel },
    ],
    [handleEdit, handleCancel]
  );

  useKeys(keys);
};

export default useWeekendsKeys;
