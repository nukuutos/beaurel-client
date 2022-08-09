import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const useUpdateResults = ({ handleSubmit }) => {
  const [{ id }, { city }] = useSelector((state) => [state.auth, state.timezone]);
  const cityRef = useRef(city);

  useEffect(() => {
    const authCase = cityRef.current !== city && cityRef.current;
    const publicCase = cityRef.current !== city && !id;

    if (authCase || publicCase) {
      handleSubmit();
    }

    if (cityRef.current !== city) {
      cityRef.current = city;
    }
  }, [city, handleSubmit, id]);
};

export default useUpdateResults;
