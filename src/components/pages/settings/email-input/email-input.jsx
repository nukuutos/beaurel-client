import React, { useState } from "react";
import DisplayInput from "../setting-input/display-input";
import EmailInputEdit from "./email-input-edit";

const EmailInput = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EmailInputEdit data={data} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Email" data={data} setIsEdit={setIsEdit} />
  );
};

export default EmailInput;
