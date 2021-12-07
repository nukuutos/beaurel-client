import React from 'react';
import MasterCard from '../../base/master-card/master-card';

const renderMasters = (masters) =>
  masters.map((master) => (
    <MasterCard className="masters__master-card" master={master} key={master._id} />
  ));

export default renderMasters;
