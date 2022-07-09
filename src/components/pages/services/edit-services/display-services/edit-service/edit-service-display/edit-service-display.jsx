import Service from '../../../../base/service';
import Loading from '../../shared/loading';
import useDeleteService from './use-delete-service';
import ButtonsDisplay from '../../shared/buttons-display/buttons-display';

const EditServiceDisplay = ({ service, setIsEdit }) => {
  const [deleteService, isLoading] = useDeleteService(service);
  const toEditing = () => setIsEdit(true);

  return (
    <div className="service service--hover service--edit-mobile card mt-6">
      <Service service={service} />

      {isLoading ? (
        <Loading />
      ) : (
        <ButtonsDisplay deleteService={deleteService} toEditing={toEditing} />
      )}
    </div>
  );
};

export default EditServiceDisplay;
