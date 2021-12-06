import { memo } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import Modal from '../../../base/modal';

const containerStyle = {
  width: '60rem',
  height: '60rem',
};

const center = {
  lat: 43.10562,
  lng: 131.87353,
};

const Maps = memo(({ onClickClose }) => (
  <Modal onClickClose={onClickClose}>
    <LoadScript googleMapsApiKey="...">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  </Modal>
));

export default Maps;
