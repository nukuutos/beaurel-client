import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditServices from './edit-services/edit-services';
import ServicesUpdates from './services-updates/services-updates';
import DraggableServices from './draggable-services/draggable-services';
import Switch from './switch/switch';
import useSaveBeforeUnload from './hooks/use-save-before-unload';

const ServicesCase = () => {
  const { services } = useSelector((state) => state.services);
  const [currentTab, setCurrentTab] = useState('display'); // reorder, display

  useSaveBeforeUnload();

  const isServices = !!services.length;

  return (
    <>
      <ServicesUpdates />
      {isServices && <Switch currentTabState={[currentTab, setCurrentTab]} />}
      {currentTab === 'reorder' ? <DraggableServices /> : <EditServices />}
    </>
  );
};

export default ServicesCase;
