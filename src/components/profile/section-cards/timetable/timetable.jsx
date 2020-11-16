import Modal from '../../../utils/modal';
import Week from './week';

const Timetable = ({ onClickClose }) => {
  return (
    <Modal onClickClose={onClickClose}>
      <main className="timetable">
        <Week />
      </main>
    </Modal>
  );
};

export default Timetable;
