import React, { useEffect } from "react";

const useBlockScroll = (htmlTag) => {
  useEffect(() => {
    const element = document.querySelector(htmlTag);
    element.style.overflow = "hidden";

    return () => {
      element.style.overflow = "visible";
    };
  }, []);
};

export default useBlockScroll;
