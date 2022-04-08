import React from 'react';
import useLoadingOnRouting from './hooks/use-loading-on-routing';

const DisplayLayoutContent = ({ children }) => {
  const isPageLoading = useLoadingOnRouting();

  return isPageLoading ? (
    <div className="content content--loading">
      <div className="spinner-with-background" />
    </div>
  ) : (
    children
  );
};

export default DisplayLayoutContent;
