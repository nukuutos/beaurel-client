import React from 'react';
import { useSelector } from 'react-redux';
import DialogCards from './dialog-cards';
import NoDialogs from './no-dialogs';

const Dialogs = ({ activeDialog, setActiveDialog }) => {
  const { dialogs } = useSelector((state) => state.messages);
  const dialogsEmptyClassName = dialogs.length ? '' : 'messages__dialogs--empty';
  const isDialogs = dialogs.length;

  return (
    <div className={`messages__dialogs ${dialogsEmptyClassName}`}>
      {isDialogs ? (
        <DialogCards activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
      ) : (
        <NoDialogs />
      )}
    </div>
  );
};

export default Dialogs;
