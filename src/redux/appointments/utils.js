export const defineCategory = (status) => {
  switch (status) {
    case 'expired':
    case 'ended':
    case 'cancelled':
    case 'rejected':
      return 'history';

    default:
      return status;
  }
};
