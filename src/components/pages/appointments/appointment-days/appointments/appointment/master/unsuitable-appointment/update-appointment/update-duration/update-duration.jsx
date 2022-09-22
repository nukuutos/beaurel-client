import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../../../../base/modal/modal-heading';
import UpdateServices from './update-services/update-services';
import useGetDataForUpdate from './use-get-data-for-update';

const UpdateDuration = ({ state, updateDuration, close }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  useGetDataForUpdate();

  return (
    <div className={`add-service ${isPhone ? '' : 'card'}`}>
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
