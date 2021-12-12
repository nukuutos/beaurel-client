import React from 'react';
import { useSelector } from 'react-redux';
import AttributesDesktop from './attributes-desktop';
import AttributesPhone from './attributes-phone';

const Attributes = (props) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  return isPhone ? <AttributesPhone {...props} /> : <AttributesDesktop {...props} />;
};

export default Attributes;
