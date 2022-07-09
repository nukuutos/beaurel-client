import Image from 'next/image';
import React from 'react';

const NoAppointments = () => (
  <div className="appointments__no-appointments no-appointments mt-8">
    <div className="no-appointments__svg">
      <Image
        priority
        layout="fill"
        className="no-appointments__svg"
        alt="No master works"
        src="/svg/no-appointments.svg"
      />
    </div>
    <p className="no-appointments__text">Записи отсутствуют</p>
  </div>
);

export default NoAppointments;
