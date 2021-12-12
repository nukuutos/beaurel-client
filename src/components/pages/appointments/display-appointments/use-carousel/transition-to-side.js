const transitionToSide = ({ styles, state, length = 1 }) => {
  const totalWidth = 100;
  const transitionTime = 400;

  const { active, desired, offset } = state;

  const dist = Math.abs(active - desired);
  const dir = (dist > length / 2 ? 1 : -1) * Math.sign(desired - active);
  const pref = Math.sign(offset || 0);

  const shift = (totalWidth * (pref || dir)) / length;

  const transition = `transform ${transitionTime}ms ease`;
  const transform = `translateX(${shift}%)`;

  return { ...styles, transition, transform };
};

export default transitionToSide;
