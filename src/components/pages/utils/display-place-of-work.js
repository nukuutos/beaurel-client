const translateRoomType = {
  salon: 'салон',
  cabinet: 'каб.',
  apartment: 'кв.',
};

const getRoomValue = (type, value) => {
  if (type !== 'salon') return value;
  return <>&laquo;{value}&raquo;</>;
};

const displayPlaceOfWork = (placeOfWork) => {
  if (!placeOfWork) return '';
  if (typeof placeOfWork === 'string') return placeOfWork;

  const { street, house, building, floor, room } = placeOfWork;
  let stringToDisplay = `ул. ${street} ${house}, `;
  if (building) stringToDisplay += `к. ${building}, `;

  const { type, value } = room;

  const roomType = translateRoomType[type];
  const roomValue = getRoomValue(type, value);

  stringToDisplay += `${floor} этаж, ${roomType}`;

  return (
    <>
      {stringToDisplay} {roomValue}
    </>
  );
};

export default displayPlaceOfWork;
