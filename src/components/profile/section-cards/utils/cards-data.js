const cardsData = (state, setState) => {
  return [
    { icon: ['far', 'calendar-alt'], name: 'Book a Time', onClick: () => setState({ ...state, isTimetable: true }) },
    { icon: 'stream', name: 'View Services', onClick: () => setState({ ...state, isServices: true }) },
    {
      icon: ['far', 'calendar-alt'],
      name: "Master's Works",
      onClick: () => setState({ ...state, isMasterWorks: true }),
    },
  ];
};

export default cardsData;
