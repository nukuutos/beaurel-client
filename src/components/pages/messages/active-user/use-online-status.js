import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MONTHS from '../dialogs/months';

const useOnlineStatus = () => {
  const [status, setStatus] = useState(null);

  const { wasOnline: notFormattedWasOnline } = useSelector(
    (state) => state.messages.activeInterlocutor
  );

  useEffect(() => {
    const updateStatus = () => {
      const wasOnline = dayjs(notFormattedWasOnline);
      const differenceInMins = dayjs().diff(notFormattedWasOnline, 'm');
      const startOfToday = dayjs().startOf('day');

      const isLessThan5Mins = differenceInMins < 5;
      const isYesterdayOrEarlier = wasOnline.isBefore(startOfToday);

      const [date, month] = [wasOnline.date(), wasOnline.month()];
      const [hour, minute] = [
        wasOnline.hour().toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        }),

        wasOnline.minute().toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        }),
      ];

      if (isLessThan5Mins) {
        setStatus('В сети');
      } else if (isYesterdayOrEarlier) {
        setStatus(`Был(а) в сети ${date} ${MONTHS[month]} ${hour}:${minute}`);
      } else {
        setStatus(`Был(а) в сети ${hour}:${minute}`);
      }
    };

    updateStatus();

    const minute = 60000;
    const id = setInterval(updateStatus, minute);

    return () => clearInterval(id);
  }, [notFormattedWasOnline]);

  return status;
};

export default useOnlineStatus;
