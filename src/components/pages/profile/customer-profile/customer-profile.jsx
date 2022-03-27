import AppointmentsStatistic from './appointments-statistic';
import SiblingAppointment from './sibling-appointment';
import SectionMasters from './section-masters/section-masters';

const CustomerProfile = () => (
  <>
    <SiblingAppointment />
    <AppointmentsStatistic />
    <SectionMasters />
  </>
);

export default CustomerProfile;
