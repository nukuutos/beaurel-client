import React, { useState } from "react";
import EditSubServiceForm from "./edit-sub-service-form";
import EditSubServiceDisplay from "./edit-sub-service-display";

const EditSubService = ({ onMouseLeave, onMouseEnter, subService, title, order }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditSubServiceForm subService={subService} title={title} setIsEdit={setIsEdit} />
  ) : (
    <EditSubServiceDisplay
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      subService={subService}
      title={title}
      setIsEdit={setIsEdit}
      order={order}
    />
  );
};

export default EditSubService;
