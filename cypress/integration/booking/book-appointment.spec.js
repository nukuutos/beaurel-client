import auth from '../../utils/auth';

// You must have 08:00 appointment
// Your appointments must be clean
describe('Book appointment', () => {
  beforeEach(() => {
    auth();
  });

  it('Desktop', () => {
    cy.intercept('GET', '/api/v1/master/**').as('getDataForBooking');
    cy.get('.profile__cards > :nth-child(1) > img').click();
    cy.wait('@getDataForBooking');

    cy.get('.booking-timetable').then(($layout) => {
      const time = '08:00';
      let isNextWeek;
      // if it is no appointments => click get next week
      if ($layout.find(`:contains('${time}')`).length < 2) {
        isNextWeek = true;
        cy.get('.booking-timetable__arrow').last().click();
      }

      cy.get('.booking-timetable__appointment')
        .contains(time)
        .first()
        .then(($appointment) => {
          // get appointment day of week
          cy.wrap($appointment)
            .parent()
            .prev()
            .children(':first')
            .then(($bookingAppointmentDay) => {
              const bookingAppointmentDay = $bookingAppointmentDay.text();
              // click on appointment
              cy.wrap($appointment).click();
              // services
              cy.get('.booking-service:not(.booking-service--disabled)').first().click();
              // book appointment
              cy.intercept('POST', '/api/v1/master/**').as('bookAppointment');
              cy.get('.btn--primary').click();
              cy.wait('@bookAppointment');
              // success
              cy.get('.booking-success__button').click();
              // check if appointment was booked
              cy.get('.profile__cards > :nth-child(1) > img').click();
              if (isNextWeek) {
                cy.get('.booking-timetable__arrow').last().click();
              }
              cy.get('.booking-timetable__appointment')
                .contains(time)
                .first()
                .then(($appointment) => {
                  cy.wrap($appointment)
                    .parent()
                    .prev()
                    .children(':first')
                    .then(($dayOfWeek) => {
                      const dayOfWeek = $dayOfWeek.text();
                      expect(bookingAppointmentDay).to.not.equal(dayOfWeek);
                    });
                });
            });
        });

      cy.visit('/appointments');
      cy.intercept('PUT', '/api/v1/master/**').as('rejectAppointment');
      cy.get('.btn--fail').click();
      cy.wait('@rejectAppointment');
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.intercept('GET', '/api/v1/master/**').as('getDataForBooking');
    cy.get('.profile__cards > :nth-child(1) > img').click();
    cy.wait('@getDataForBooking');

    cy.get('.booking-timetable').then(($layout) => {
      if ($layout.find(`.btn-text`).length) {
        cy.get('.btn-text').click();
      }

      const time = '08:00';

      cy.get('.booking-timetable__appointment').contains(time).click();
      cy.get('.booking-service:not(.booking-service--disabled)').first().click();
      // book appointment
      cy.intercept('POST', '/api/v1/master/**').as('bookAppointment');
      cy.get('.btn--primary').click();
      cy.wait('@bookAppointment');
      // success
      cy.get('.booking-success__button').click();
      // check if appointment was booked
      cy.get('.profile__cards > :nth-child(1) > img').click();
      // check
      cy.get('.booking-timetable').then(($layout) => {
        if ($layout.find(`.btn-text`).length) {
          cy.get('.btn-text').click();
        }

        cy.get('.booking-timetable__appointment').contains(time).should('not.exist');
      });
    });

    cy.visit('/appointments');
    cy.intercept('PUT', '/api/v1/master/**').as('rejectAppointment');
    cy.get('.btn--fail').click();
    cy.wait('@rejectAppointment');
  });
});
