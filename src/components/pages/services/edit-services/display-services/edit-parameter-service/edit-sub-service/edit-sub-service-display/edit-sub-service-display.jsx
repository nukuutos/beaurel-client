import SubService from '../../../../../base/parameter-service/sub-service';
import Loading from '../../../utils/loading';
import ButtonsDisplay from '../../../utils/buttons-display/buttons-display';
import useSubServiceDelete from './use-sub-service-delete';

const EditSubServiceDisplay = ({ events, subService, setIsEdit, serviceProps }) => {
  const [deleteSubService, isLoading] = useSubServiceDelete({ subService, ...serviceProps });

  const { handleMouseLeave, handleMouseEnter } = events;

  const toEditing = () => setIsEdit(true);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service service--hover service--edit-mobile service-parameter__sub-service"
    >
      <SubService subService={subService} />

      {isLoading ? (
        <Loading />
      ) : (
        <ButtonsDisplay deleteService={deleteSubService} toEditing={toEditing} />
      )}
    </div>
  );
};

export default EditSubServiceDisplay;
