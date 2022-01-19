const cardsData = (state, setState, isMobile = false) => [
  {
    fileName: isMobile ? 'cards-phone/book-card.svg' : 'book-card.svg',
    onClick: () => setState({ ...state, isTimetable: true }),
  },
  {
    fileName: isMobile ? 'cards-phone/services-card.svg' : 'services-card.svg',
    onClick: () => setState({ ...state, isServices: true }),
  },
  {
    fileName: isMobile ? 'cards-phone/works-card.svg' : 'works-card.svg',
    onClick: () => setState({ ...state, isMasterWorks: true }),
  },
];

export default cardsData;
