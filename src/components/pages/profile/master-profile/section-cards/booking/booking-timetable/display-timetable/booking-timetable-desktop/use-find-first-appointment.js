import { useEffect, useRef } from 'react';

const useFindFirstAppointment = ({ isUnavailableWeek, setStartDay }) => {
  const isStartFound = useRef(false);

  useEffect(() => {
    const nextWeek = () => setStartDay((today) => today.weekday(7));

    if (isUnavailableWeek && !isStartFound.current) {
      nextWeek();
    } else {
      isStartFound.current = true;
    }
  }, [isUnavailableWeek, setStartDay]);
};

export default useFindFirstAppointment;
