import React from "react";

const AppointmentsCategoriesControllerPhone = ({ categoryState }) => {
  const [category, setState] = categoryState;

  const handleChange = (e) => {
    e.persist();
    setState((state) => ({ ...state, category: e.target.value }));
  };

  return (
    <h2 className="appointments__appointment-types appointment-types card mt-8">
      <label className="label appointment-types__status-label">Cтатус</label>
      <select onChange={handleChange} value={category} className="input" name="type">
        <option value="onConfirmation">ожидают</option>
        <option value="confirmed">подтверждены</option>
        <option value="unsuitable">неподходящие</option>
        <option value="history">история</option>
      </select>
    </h2>
  );
};

export default AppointmentsCategoriesControllerPhone;
