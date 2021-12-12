const createHandlers = ({ onMouseDown, setContainer, ref, active, isPhone }) => ({
  onMouseDown,
  ref(container) {
    if (container && container.firstElementChild && isPhone) {
      const day = container.children[active];
      const dayHeight = window.getComputedStyle(day).getPropertyValue('height');
      const dayHeightPx = dayHeight.split('px')[0];
      const addingHeight = Number(dayHeightPx) + 10;
      const newHeightProperty = `${addingHeight}px`;

      container.style.height = newHeightProperty;
    }

    if (container && container.firstElementChild && !isPhone) container.style.height = 'unset';
    setContainer(container && container.firstElementChild);
    return ref(container);
  },
});

export default createHandlers;
