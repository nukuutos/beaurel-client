const insertElementInSortedArray = (value, array, insert) => {
  // insertion if array length === 0
  if (array.length === 0) {
    insert(0, value);
    return;
  }

  // insertion(from 0 to n-1) if array has elements
  for (let i = 0; i < array.length; i++) {
    const nextElement = array[i];
    if (value < nextElement && i === 0) {
      insert(0, value);
      return;
    }

    if (value < nextElement) {
      insert(i, value);
      return;
    }
  }

  // insertion to the end of the array(n);
  insert(array.length, value);
};

export default insertElementInSortedArray;
