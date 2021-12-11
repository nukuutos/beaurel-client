import useOnSubmit from './use-on-submit';
import Loading from './loading';
import ServiceParameterForm from './form/service-parameter-form';

const AddServiceParameterForm = ({ onClickClose }) => {
  const [handleSubmit, isLoading] = useOnSubmit(onClickClose);

  return isLoading ? <Loading /> : <ServiceParameterForm handleSubmit={handleSubmit} />;
};

export default AddServiceParameterForm;
