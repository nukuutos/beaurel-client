import { CLOSE_MASTER_TOOLS, SET_MASTER_TOOLS, SET_TIMETABLE_TOOL } from './types';

const INITIAL_STATE = { isServices: false, isTimetable: false, isOpen: false, isViewed: false };

const masterToolsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MASTER_TOOLS: {
      const { isServices, isTimetable } = payload;
      const isOpen = (!isServices || !isTimetable) && !state.isViewed;

      return {
        ...state,
        isServices,
        isTimetable,
        isOpen,
        isViewed: true,
      };
    }

    case SET_TIMETABLE_TOOL: {
      return {
        ...state,
        isTimetable: true,
        isOpen: true,
        isViewed: false,
      };
    }

    case CLOSE_MASTER_TOOLS:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default masterToolsReducer;
