import React from 'react';
import { useSelector } from 'react-redux';
import NoServicesMaster from './no-services-master';
import NoTimetableMaster from './no-timetable-master';

const NoToolsMaster = ({ onClickClose }) => {
  const { tools } = useSelector((state) => state.profile);

  const { isServices, isTimetable } = tools;

  return (
    <>
      {!isTimetable && <NoTimetableMaster onClickClose={onClickClose} />}
      {isTimetable && !isServices && <NoServicesMaster onClickClose={onClickClose} />}
    </>
  );
};

export default NoToolsMaster;
