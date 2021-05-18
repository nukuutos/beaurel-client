import { setAlert } from '../../../redux/alert/actions';

const checkValid = (current, next, prev, sessionTime) => {
  if (prev && prev + sessionTime > current) return false;
  if (next && current + sessionTime > next) return false;
  return true;
};

const insertElementInSortedArrayWithSessionTimeCheck = (value, array, insert, sessionTime, dispatch) => {
  // insertion if array length === 0
  if (array.length === 0) {
    insert(0, value);
    return;
  }

  // insertion(from 0 to n-1) if array has elements
  for (let i = 0; i < array.length; i++) {
    const nextElement = array[i];

    if (value < nextElement && i === 0) {
      const isValid = checkValid(value, nextElement, null, sessionTime);

      if (isValid) insert(0, value);
      else
        dispatch(
          setAlert({
            message: `Данное время не подходит, основываясь на вашей длительности сеанса`,
            type: 'fail',
          })
        );

      return;
    }

    if (value < nextElement) {
      const isValid = checkValid(value, nextElement, array[i - 1], sessionTime);

      if (isValid) insert(i, value);
      else
        dispatch(
          setAlert({
            message: `Данное время не подходит, основываясь на вашей длительности сеанса`,
            type: 'fail',
          })
        );

      return;
    }
  }

  // insertion to the end of the array(n);
  const isValid = checkValid(value, null, array[array.length - 1], sessionTime);
  if (isValid) insert(array.length, value);
  else
    dispatch(
      setAlert({
        message: `Данное время не подходит, основываясь на вашей длительности сеанса`,
        type: 'fail',
      })
    );
};

export default insertElementInSortedArrayWithSessionTimeCheck;
