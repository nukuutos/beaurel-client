import React from 'react';
import { useSelector } from 'react-redux';
import DialogCard from './dialog-card';

const DialogCards = ({ activeDialog, setActiveDialog }) => {
  const { dialogs } = useSelector((state) => state.messages);

  return dialogs.map((dialog) => (
    <DialogCard activeDialog={activeDialog} setDialog={setActiveDialog} dialog={dialog} />
  ));
};

export default DialogCards;
