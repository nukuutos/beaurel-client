import React from 'react';
import { MONTHS } from './utils';

const getChoice = (date) => `${MONTHS[date.month()]}, ${date.date()}`;

const DisplayChoice = ({ choice }) => {
  const dataToDisplay = getChoice(choice);
  return <div className="date-picker__choice mt-4 mb-5 ml-1">{dataToDisplay}</div>;
};
export default DisplayChoice;
