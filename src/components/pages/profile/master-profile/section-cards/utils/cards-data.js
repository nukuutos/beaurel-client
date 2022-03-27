const cardsData = (state, setState, isPhone = false) => [
  {
    fileName: isPhone ? 'cards-phone/book-card.svg' : 'book-card.svg',
    onClick: () => setState({ ...state, isTimetable: true }),
  },
  {
    fileName: isPhone ? 'cards-phone/services-card.svg' : 'services-card.svg',
    onClick: () => setState({ ...state, isServices: true }),
  },
  {
    fileName: isPhone ? 'cards-phone/works-card.svg' : 'works-card.svg',
    onClick: () => setState({ ...state, isMasterWorks: true }),
  },
];

export default cardsData;
