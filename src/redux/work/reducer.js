import { GET_WORKS_SUCCESS, DELETE_WORK_SUCCESS, ADD_WORK_SUCCESS, UPDATE_WORK_SUCCESS } from './types';

const INITIAL_STATE = { masterId: null, works: [] };

const workReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKS_SUCCESS:
      const { works, masterId } = payload;

      return {
        ...state,
        masterId,
        works,
      };

    case ADD_WORK_SUCCESS:
      const { work } = payload;

      return {
        ...state,
        works: [...state.works, work],
      };

    case UPDATE_WORK_SUCCESS:
      const { updatedWork } = payload;

      const updatedWorks = state.works.map((work) => {
        // to for loop?
        if (work._id === updatedWork._id) return updatedWork;
        return work;
      });

      return {
        ...state,
        works: updatedWorks,
      };

    case DELETE_WORK_SUCCESS:
      const { deletedId } = payload;
      console.log(deletedId);
      return {
        ...state,
        works: state.works.filter((work) => work._id !== deletedId),
      };

    default:
      return state;
  }
};

export default workReducer;
