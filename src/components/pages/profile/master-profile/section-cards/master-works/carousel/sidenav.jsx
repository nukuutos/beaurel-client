import Pen from '../../../../../../base/icons/pen';
import Trash from '../../../../../../base/icons/trash';

const Sidenav = ({ className, goToEditWork, deleteWork }) => (
  <div className={className}>
    <div onClick={goToEditWork} className="btn-icon mr-2">
      <Pen />
    </div>
    <div onClick={deleteWork} className="btn-icon btn-icon--fail">
      <Trash />
    </div>
  </div>
);

export default Sidenav;
