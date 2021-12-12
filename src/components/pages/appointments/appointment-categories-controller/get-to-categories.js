const getToCategories = (setState) => {
  const goToOnConfirmation = () => setState((state) => ({ ...state, category: 'onConfirmation' }));
  const goToConfirmed = () => setState((state) => ({ ...state, category: 'confirmed' }));
  const goToUnsuitable = () => setState((state) => ({ ...state, category: 'unsuitable' }));
  const goToHistory = () => setState((state) => ({ ...state, category: 'history' }));

  return { goToOnConfirmation, goToConfirmed, goToUnsuitable, goToHistory };
};

export default getToCategories;
