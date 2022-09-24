import ModalHeading from '../../../../../../../../../base/modal/modal-heading';
import UpdateServices from './update-services/update-services';
import useGetDataForUpdate from './use-get-data-for-update';

const UpdateDuration = ({ state, updateDuration, close }) => {
  useGetDataForUpdate();

  return (
    <div className="add-service">
      <ModalHeading
        titleDesktopClassName="add-service__heading"
        title="Изменить длительность"
        onClickClose={close}
      />

      <UpdateServices state={state} updateDuration={updateDuration} />
    </div>
  );
};

export default UpdateDuration;
