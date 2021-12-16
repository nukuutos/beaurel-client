import useKeys from '../../../../../../hooks/use-keys';

const useWorkingDayKeys = (handleClicks) => {
  const [handleEdit, handleCancel] = handleClicks;

  const keys = () => [
    { key: 'Enter', fn: handleEdit },
    { key: 'Escape', fn: handleCancel },
  ];

  useKeys(keys);
};

export default useWorkingDayKeys;
