import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import DialogCard from './dialog-card';
import useOnScroll from './use-on-scroll';

const DialogCards = () => {
  const { dialogs } = useSelector((state) => state.messages);
  const [refToLoadData, isLoading] = useOnScroll();

  return dialogs.map((dialog, i) => {
    const isPreLast = dialogs.length - 2 === i;
    dialog.createdAt = dayjs(dialog.createdAt).utc(true);

    return isPreLast ? (
      <DialogCard dialogCardToRef={refToLoadData} dialog={dialog} key={dialog._id} />
    ) : (
      <DialogCard dialog={dialog} key={dialog._id} />
    );
  });
};

export default DialogCards;
