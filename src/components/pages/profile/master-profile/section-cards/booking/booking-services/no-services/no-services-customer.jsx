import NoToolCustomer from '../../shared/no-tool-customer';

const NoServicesCustomer = ({ onClickClose }) => (
  <NoToolCustomer title="Услуги" svgSrc="/svg/no-services.svg" onClickClose={onClickClose}>
    Невозможно записаться к мастеру
  </NoToolCustomer>
);

export default NoServicesCustomer;
