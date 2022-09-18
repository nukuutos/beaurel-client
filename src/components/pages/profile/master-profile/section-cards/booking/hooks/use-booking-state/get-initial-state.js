const getInitialState = ({ isService = false, isTimetable = false }) => ({
  isService,
  isTimetable,
  isResult: false,
  isSuccess: false,
  step: 1,
  lastStepName: null,
  service: null,
  date: null,
  time: null,
  availableAppointments: [],
  unavailableAppointments: [],
});

export default getInitialState;
