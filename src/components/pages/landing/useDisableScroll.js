import { useState } from 'react';

const useDisableScroll = () => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const toggleScroll = () => setIsScrollDisabled((state) => !state);
  const landingScrollClassName = isScrollDisabled ? 'landing__main--disable-scroll' : '';

  return { toggleScroll, landingScrollClassName };
};

export default useDisableScroll;
