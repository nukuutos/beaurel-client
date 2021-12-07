import useKeys from '../../../../../../../hooks/use-keys';

const useCarouselKeys = ({ toNextWork, toPrevWork }) => {
  const keys = () => [
    { key: 'ArrowRight', fn: toNextWork },
    {
      key: 'ArrowLeft',
      fn: toPrevWork,
    },
  ];

  useKeys(keys);
};

export default useCarouselKeys;
