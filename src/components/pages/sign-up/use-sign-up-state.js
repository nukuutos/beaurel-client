import { useReducer } from 'react';

const SET_USER = 'SET_USER';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER: {
      const { user } = payload;

      let steps;

      if (user === 'customer') steps = 5;
      else steps = 6;

      return { ...state, user, steps };
    }

    default:
      return state;
  }
};

const initialState = { steps: 6, user: 'master' };

const useSignUpState = ({ resetProgress }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMaster = () => {
    resetProgress();
    dispatch({ type: SET_USER, payload: { user: 'master' } });
  };

  const setCustomer = () => {
    resetProgress();
    dispatch({ type: SET_USER, payload: { user: 'customer' } });
  };

  const actions = { setMaster, setCustomer };

  return [state, actions];
};

export default useSignUpState;
