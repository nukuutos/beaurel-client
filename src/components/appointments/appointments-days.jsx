import React from "react";
import useMediaQuery from "../../hooks/use-media-query";
import { phoneRenderAppointments, renderAppointments } from "./utils/render";

const AppointmentsDays = ({ handlers, style, renderArguments = [] }) => {
  const isPhone = useMediaQuery(600);

  return (
    <div {...handlers} style={isPhone ? style : {}} className="appointments__days">
      {isPhone ? phoneRenderAppointments(...renderArguments) : renderAppointments(...renderArguments)}
    </div>
  );
};

export default AppointmentsDays;
