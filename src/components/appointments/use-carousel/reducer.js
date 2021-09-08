const previous = (current) => {
  if (current === 0) return current;
  return current - 1;
};

const next = (length, current) => {
  if (current === length - 1) return current;
  return current + 1;
};

const carouselReducer = (state, action) => {
  const { type, length, offset } = action;
  const { active } = state;

  switch (type) {
    case "jump":
      return {
        ...state,
        desired: action.desired,
      };

    case "next":
      return {
        ...state,
        desired: next(length, active),
      };

    case "prev":
      return {
        ...state,
        desired: previous(active),
      };

    case "done":
      return {
        ...state,
        offset: null,
        active: state.desired,
      };

    case "drag":
      return {
        ...state,
        offset,
      };

    default:
      return state;
  }
};

export default carouselReducer;
