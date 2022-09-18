import {
  BACK_TO_SERVICES,
  BACK_TO_TIMETABLE,
  FROM_RESULT_TO_SERVICES,
  FROM_RESULT_TO_TIMETABLE,
  GO_TO_SUCCESS,
  PICK_DATE,
  PICK_SERVICE,
  UNSET_APPOINTMENT,
} from './types';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case BACK_TO_TIMETABLE: {
      return {
        ...state,
        isTimetable: true,
        isService: false,
        step: state.step - 1,
        date: null,
        time: null,
        availableAppointments: [],
        unavailableAppointments: [],
      };
    }

    case BACK_TO_SERVICES: {
      return {
        ...state,
        isTimetable: false,
        isService: true,
        step: state.step - 1,
        service: null,
      };
    }

    case FROM_RESULT_TO_SERVICES: {
      return {
        ...state,
        isResult: false,
        isService: true,
        step: state.step - 1,
        service: null,
      };
    }

    case FROM_RESULT_TO_TIMETABLE: {
      return {
        ...state,
        isResult: false,
        isTimetable: true,
        step: state.step - 1,
        date: null,
        time: null,
        availableAppointments: [],
        unavailableAppointments: [],
      };
    }

    case PICK_SERVICE: {
      const { step } = state;

      const newState = {
        isService: false,
        step: state.step + 1,
        lastStepName: 'service',
        service: { ...payload },
      };

      if (step === 1) {
        newState.isTimetable = true;
      } else {
        newState.isResult = true;
      }

      return {
        ...state,
        ...newState,
      };
    }

    case PICK_DATE: {
      const { step } = state;

      const newState = {
        isTimetable: false,
        step: state.step + 1,
        lastStepName: 'timetable',
        ...payload,
      };

      if (step === 1) {
        newState.isService = true;
      } else {
        newState.isResult = true;
      }

      return {
        ...state,
        ...newState,
      };
    }

    case UNSET_APPOINTMENT: {
      return {
        ...state,
        date: null,
        time: null,
        availableAppointments: [],
        unavailableAppointments: [],
        service: null,
      };
    }

    case GO_TO_SUCCESS:
      return { ...state, isResult: false, isSuccess: true, step: state.step + 1 };

    default:
      return state;
  }
};

export default reducer;
