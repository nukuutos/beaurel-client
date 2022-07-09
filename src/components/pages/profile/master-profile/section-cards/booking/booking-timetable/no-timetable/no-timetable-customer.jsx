import NoToolCustomer from '../../shared/no-tool-customer';

const NoTimetableCustomer = ({ onClickClose }) => (
  <NoToolCustomer
    title="Записаться"
    svgSrc="/svg/not-able-to-booking.svg"
    onClickClose={onClickClose}
  >
    Невозможно записаться к мастеру
  </NoToolCustomer>
);

export default NoTimetableCustomer;
