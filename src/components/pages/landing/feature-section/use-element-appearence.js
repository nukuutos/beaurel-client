import { useEffect, useRef } from 'react';

const useElementAppearence = ({ className, threshold }) => {
  const featureBoxRef = useRef();
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const element = entries[0];
        if (element.isIntersecting) {
          element.target.className += `  ${className}`;
          observer.current.unobserve(element.target);
        }
      },
      { threshold: [threshold] }
    );

    if (featureBoxRef.current) {
      observer.current.observe(featureBoxRef.current);
    }

    return () => observer.current.disconnect();
  }, [className, threshold]);

  return featureBoxRef;
};

export default useElementAppearence;
