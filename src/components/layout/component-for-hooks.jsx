import React from 'react';
import useDetectTimezone from '../../hooks/use-detect-timezone';
import useSocket from '../../hooks/use-socket';
import useUpdateStatus from '../../hooks/use-update-status';

const ComponentForHooks = () => {
  useUpdateStatus();
  useDetectTimezone();
  useSocket();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default ComponentForHooks;
