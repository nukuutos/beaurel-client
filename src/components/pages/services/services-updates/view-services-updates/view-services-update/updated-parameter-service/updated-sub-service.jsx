import SubService from '../../../../base/parameter-service/sub-service';

const UpdatedSubService = ({ onMouseEnter, onMouseLeave, subService }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="service service--hover service-parameter__sub-service"
  >
    <SubService subService={subService} />
  </div>
);

export default UpdatedSubService;
