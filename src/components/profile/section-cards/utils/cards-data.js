const cardsData = (state, setState) => {
  return [
    // {
    //   fileName: 'book-card.svg',
    //   cardName: 'Запишись',
    //   captionClassName: 'profile-card__name--light-3',
    //   onClick: () => setState({ ...state, isTimetable: true }),
    // },
    // {
    //   fileName: 'services-card.svg',
    //   cardName: 'Услуги',
    //   captionClassName: 'profile-card__name--dark-2',
    //   onClick: () => setState({ ...state, isServices: true }),
    // },
    // {
    //   fileName: 'works-card.svg',
    //   cardName: 'Работы',
    //   captionClassName: 'profile-card__name--light-2',
    //   onClick: () => setState({ ...state, isMasterWorks: true }),
    // },
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
