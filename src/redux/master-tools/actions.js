import { CLOSE_MASTER_TOOLS, SET_MASTER_TOOLS, SET_TIMETABLE_TOOL } from './types';

export const setMasterTools = (tools) => ({
  type: SET_MASTER_TOOLS,
  payload: tools,
});

export const closeMasterTools = () => ({
  type: CLOSE_MASTER_TOOLS,
});

export const setTimetableTool = () => ({
  type: SET_TIMETABLE_TOOL,
});
