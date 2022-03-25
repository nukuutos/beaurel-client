import React from 'react';
import CancelledCase from './cancelled-case';
import HistoryCase from './history-case';
import RejectedCase from './rejected-case';
import UnansweredCase from './unanswered-case';

const DisplayInformation = ({ appointment, openReviewEditor }) => {
  const { review, status: statusData } = appointment; // do we need id comment and date from review ?

  const { status, user } = statusData;

  switch (status) {
    case 'history':
      return <HistoryCase openReviewEditor={openReviewEditor} review={review} />;
    case 'unanswered':
      return <UnansweredCase />;
    case 'rejected':
      return <RejectedCase />;
    case 'cancelled':
      return <CancelledCase user={user} />;
    default:
      return null;
  }
};

export default DisplayInformation;
