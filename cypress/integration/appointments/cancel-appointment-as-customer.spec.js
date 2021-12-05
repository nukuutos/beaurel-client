import auth from '../../utils/auth';

// You must have 08:00 appointment
// Your appointments must be clean
describe('Cancel appointment as customer', () => {
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
    // check appointment as cutomer
    cy.intercept('GET', '/api/v1/profile/**').as('getAppointmentsAsCustomer');
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    cy.wait('@getAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // cancel appointment
    cy.get('.btn--fail').click();
    cy.intercept('PUT', '/api/v1/master/**').as('cancelAppointment');
    cy.get('.appointment-cancellation__buttons > .btn--primary').click();
    cy.wait('@cancelAppointment');
    cy.get('.appointments__appointment-card').should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);
    cy.visit('/appointments');
    // check appointment as cutomer
    cy.intercept('GET', '/api/v1/profile/**').as('getAppointmentsAsCustomer');
    cy.get('.appointment-controller__item:not(.appointment-controller__item--active)').click();
    cy.wait('@getAppointmentsAsCustomer');
    cy.get('.appointments__appointment-card').should('be.visible');
    // cancel appointment
    cy.get('.btn--fail').click();
    cy.intercept('PUT', '/api/v1/master/**').as('cancelAppointment');
    cy.get('.appointment-cancellation__buttons > .btn--primary').click();
    cy.wait('@cancelAppointment');
    cy.get('.appointments__appointment-card').should('not.exist');
  });
});
