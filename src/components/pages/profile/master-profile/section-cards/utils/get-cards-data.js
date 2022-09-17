const getCardsData = (openActions, isPhone = false) => {
  const { openMasterWorks, openServices, openTimetable } = openActions;

  return [
    {
      fileName: isPhone ? 'cards-phone/book-card.svg' : 'book-card.svg',
      onClick: openTimetable,
    },
    {
      fileName: isPhone ? 'cards-phone/services-card.svg' : 'services-card.svg',
      onClick: openServices,
    },
    {
      fileName: isPhone ? 'cards-phone/works-card.svg' : 'works-card.svg',
      onClick: openMasterWorks,
    },
  ];
};

export default getCardsData;
