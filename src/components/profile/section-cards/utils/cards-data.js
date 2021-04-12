const cardsData = (state, setState) => {
  return [
    {
      fileName: 'book-card-1.svg',
      onClick: () => setState({ ...state, isTimetable: true }),
    },
    {
      fileName: 'services-card-1.svg',
      onClick: () => setState({ ...state, isServices: true }),
    },
    {
      fileName: 'works-card-1.svg',
      onClick: () => setState({ ...state, isMasterWorks: true }),
    },
  ];
};

export default cardsData;
