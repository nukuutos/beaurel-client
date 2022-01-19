import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AppointmentsStatistic from './appointments-statistic';
import Header from '../header/header';
import SiblingAppointment from './sibling-appointment';
import SectionMasters from './section-masters/section-masters';

const CustomerProfile = () => (
  <>
    <Header />
    <SiblingAppointment />
    <AppointmentsStatistic />
    <SectionMasters />
  </>
);

export default CustomerProfile;
