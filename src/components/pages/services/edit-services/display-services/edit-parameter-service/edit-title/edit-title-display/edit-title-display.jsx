import ParameterServiceTitle from '../../../../../base/parameter-service/parameter-service-title';
import Loading from '../../../shared/loading';
import ButtonsDisplay from '../../../shared/buttons-display/buttons-display';
import useDeleteService from './use-delete-service';
import getClassName from '../../../../../utils/get-title-class-name';

const EditTitleDisplay = ({ service, setIsEdit, shownState }) => {
  const [isShown, setIsShown] = shownState;

  const { title } = service;

  const [deleteService, isLoading] = useDeleteService(title);

  const toEditing = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const className = getClassName(isShown);

  return (
    <div
      onClick={() => setIsShown(!isShown)}
      className={`service service--edit-mobile ${className}`}
    >
      <ParameterServiceTitle shownState={shownState} title={title} />

      {isLoading ? (
        <Loading />
      ) : (
        <ButtonsDisplay deleteService={deleteService} toEditing={toEditing} />
      )}
    </div>
  );
};

export default EditTitleDisplay;
