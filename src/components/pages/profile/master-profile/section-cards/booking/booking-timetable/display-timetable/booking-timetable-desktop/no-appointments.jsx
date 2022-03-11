const NoAppointments = ({ setDate }) => (
  <div className="booking-timetable__no-appointments">
    На этой неделе нет свободных записей!
    <button
      type="button"
      onClick={() => setDate((today) => today.weekday(7))}
      className="btn-text mt-2"
    >
      следующая неделя
    </button>
  </div>
);

export default NoAppointments;
