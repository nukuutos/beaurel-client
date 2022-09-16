import { useReducer } from 'react';
import getInitialState from './get-initial-state';

const TOGGLE_TEXT = 'toggle-text`';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_TEXT:
      return { ...state, isExpand: !state.isExpand };

    default:
      return state;
  }
};

const useTextMore = (text) => {
  const initialState = getInitialState(text);

  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = () => dispatch({ type: TOGGLE_TEXT });

  return [state, toggle];
};

export default useTextMore;
