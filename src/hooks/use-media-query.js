import { useEffect, useState } from "react";

const useMediaQuery = (maxWidth) => {
  const [isMaxWidth, setIsMaxWidth] = useState(true);

  const onResize = () => {
    const isSuit = window.innerWidth <= maxWidth;
    if (isSuit) setIsMaxWidth(true);
    else setIsMaxWidth(false);
  };

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [maxWidth]);

  return isMaxWidth;
};

export default useMediaQuery;
