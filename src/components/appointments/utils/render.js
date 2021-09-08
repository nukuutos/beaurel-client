import renderCustomerAppointment from "../appointment/utils/render-customer-appointment";
import renderMasterAppointment from "../appointment/utils/render-master-appointment";

export const renderAppointments = (appointments, user, category) => {
  const days = [];

  for (let date in appointments) {
    const renderFunction = user === "master" ? renderMasterAppointment : renderCustomerAppointment;

    const renderedAppointments = appointments[date].map((appointment, i) => {
      return renderFunction(appointment, category, i);
    });

    days.push(
      <div className="appointments__day mt-8">
        {[<span className="appointments__date ml-1">{date}</span>, ...renderedAppointments]}
      </div>
    );
  }

  return days;
};

export const phoneRenderAppointments = (appointments, user, category) => {
  const days = [];

  for (let date in appointments) {
    const renderFunction = user === "master" ? renderMasterAppointment : renderCustomerAppointment;

    const renderedAppointments = appointments[date].map((appointment, i) => {
      return renderFunction(appointment, category, i);
    });

    days.push(
      <div key={date} className="appointments__day">
        {renderedAppointments}
      </div>
    );
  }

  return days;
};
