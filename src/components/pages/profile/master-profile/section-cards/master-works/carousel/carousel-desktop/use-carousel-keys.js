import useKeys from '../../../../../../../../hooks/use-keys';

const useCarouselKeys = ({ goToNextWork, goToPrevWork, isChevrons }) => {
  const keys = () => [
    { key: 'ArrowRight', fn: isChevrons ? goToNextWork : null },
    {
      key: 'ArrowLeft',
      fn: isChevrons ? goToPrevWork : null,
    },
  ];

  useKeys(keys);
};

export default useCarouselKeys;
