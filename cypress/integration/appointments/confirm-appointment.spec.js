import auth from '../../utils/auth';

// You must have 08:00 appointment
// Your appointments must be clean
describe('Confirm appointment', () => {
  beforeEach(() => {
    auth();
    // book appointment
    cy.intercept('GET', '/api/v1/master/**').as('getDataForBooking');
    cy.get('.profile__cards > :nth-child(1) > img').click();
    cy.wait('@getDataForBooking');
    // if it is no appointments => click get next week
    cy.get('.booking-timetable').then(($layout) => {
      if ($layout.find(`:contains(':')`).length < 2) {
        cy.get('.booking-timetable__arrow').last().click();
      }
    });

    cy.get('.booking-timetable__appointment').contains(':').first().click();
    // services
    cy.get('.booking-service:not(.booking-service--disabled)').first().click();
    // book
    cy.intercept('POST', '/api/v1/master/**').as('bookAppointment');
    cy.get('.btn--primary').click();
    cy.wait('@bookAppointment');

    cy.get('.booking-success__button').click();
  });

  it('Desktop', () => {
    cy.visit('/appointments');
    // check appointment as master
    cy.get('.appointments__appointment-card').should('be.visible');
    // check appointment as cutomer
    cy.intercept('GET', '/api/v1/profile/**').as('getAppointmentsAsCustomer');
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    cy.wait('@getAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // go back to master
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // confirm appointment
    cy.intercept('PUT', '/api/v1/master/**').as('confirmAppointment');
    cy.get('.btn--primary').click();
    cy.wait('@confirmAppointment');
    cy.get('.appointments__appointment-card').should('not.exist');
    // switch to customer view
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // to confirmed appointments
    cy.intercept('GET', '/api/v1/profile/**').as('getConfirmedAppointmentsAsCustomer');
    cy.get('.appointment-types__type').contains('подтверждены').click();
    cy.wait('@getConfirmedAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // go back to master
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // switch to confirmed appointments
    cy.get('.appointment-types__type').contains('подтверждены').click({ force: true });
    cy.get('.appointments__appointment-card').should('be.visible');
    // cancel appointment
    cy.intercept('PUT', '/api/v1/master/**').as('cancelAppoitment');
    cy.get('.btn--fail').click();
    cy.wait('@cancelAppoitment');
    cy.get('.appointments__appointment-card').should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);
    cy.visit('/appointments');
    // check appointment as master
    cy.get('.appointments__appointment-card').should('be.visible');
    // check appointment as cutomer
    cy.intercept('GET', '/api/v1/profile/**').as('getAppointmentsAsCustomer');
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    cy.wait('@getAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // go back to master
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // confirm appointment
    cy.intercept('PUT', '/api/v1/master/**').as('confirmAppointment');
    cy.get('.btn--primary').click();
    cy.wait('@confirmAppointment');
    cy.get('.appointments__appointment-card').should('not.exist');
    // switch to customer view
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // to confirmed appointments
    cy.intercept('GET', '/api/v1/profile/**').as('getConfirmedAppointmentsAsCustomer');
    cy.get('.appointment-types__type').contains('подтверждены').click();
    cy.wait('@getConfirmedAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // go back to master
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    // switch to confirmed appointments
    cy.get('.appointment-types__type').contains('подтверждены').click({ force: true });
    cy.get('.appointments__appointment-card').should('be.visible');
    // cancel appointment
    cy.intercept('PUT', '/api/v1/master/**').as('cancelAppoitment');
    cy.get('.btn--fail').click();
    cy.wait('@cancelAppoitment');
    cy.get('.appointments__appointment-card').should('not.exist');
  });
});
