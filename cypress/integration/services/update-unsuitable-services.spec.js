import auth from '../../utils/auth';
import { addServiceDesktop, deleteServiceDesktop } from './utils';

// update session time to 90min!
const serviceTitle = 'УслугаДляОбновления';
const durationSelect = 0;

describe('Update unsuitable services', () => {
  beforeEach(() => {
    auth();

    cy.visit('/services');

    deleteServiceDesktop(serviceTitle);
    addServiceDesktop({ title: serviceTitle, durationSelect });

    cy.visit('/timetable');

    cy.get('main', { timeout: 60000 }).should('be.visible');

    // conditional action
    cy.get('body').then(($body) => {
      if ($body.find('.timetable-card__delete-btn').length > 0) {
        cy.get('.timetable-card__delete-btn').click();
        cy.get('.btn--primary').click();
      }
    });
  });

  it('Desktop', () => {
    // change sessionTime to 90 minutes
    cy.get('.timetable-card--edit > .timetable-card__btn-edit').click();
    cy.get('.timetable-card__select').select(2);
    cy.get('.timetable-card__btn-edit--primary').click();
    // open date-picker
    cy.get('.btn--primary').click();
    //  update
    cy.intercept('/api/v1/master/**').as('updateTimetable');
    cy.get('.date-picker__button').click();
    cy.wait('@updateTimetable');

    cy.get('.modal > .svg-inline--fa').click();

    // go to services
    cy.visit('/services');
    // click alert
    cy.get('.udpate-alert__button').click();
    // check alert
    cy.get('.booking-services > .services__container').then(($container) => {
      const children = $container.children();
      expect(children.length).to.not.equal(0);
    });

    // update services
    cy.get('.edit-service__input > .input').each(($input) => cy.wrap($input).select(1));
    // save
    cy.intercept('/api/v1/master/**').as('updateUnsuitableServices');
    cy.get('.services__container > .btn').click();
    cy.wait('@updateUnsuitableServices');
    // check change of service alert
    cy.get('.update-alert:not(.update-alert--error)').should('be.visible');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    // change sessionTime to 90 minutes
    cy.get('.timetable-card--edit > .timetable-card__btn-edit').click();
    cy.get('.timetable-card__select').select(2);
    cy.get('.timetable-phone-edit-modal__button').click();

    // open date-picker
    cy.get('.btn--primary').click();
    //  update
    cy.intercept('/api/v1/master/**').as('updateTimetable');
    cy.get('.date-picker__button').click();
    cy.wait('@updateTimetable');
    // click back button
    cy.get('.back-bar__main > .svg-inline--fa').click();
    // go to services
    cy.visit('/services');
    // click alert
    cy.get('.udpate-alert__button').click();
    // check alert
    cy.get('.booking-services > .services__container').then(($container) => {
      const children = $container.children();
      expect(children.length).to.not.equal(0);
    });
    // update services
    cy.get('.edit-service__input > .input').each(($input) => cy.wrap($input).select(1));
    // save
    cy.intercept('/api/v1/master/**').as('updateUnsuitableServices');
    cy.get('.services__container > .btn').click();
    cy.wait('@updateUnsuitableServices');
    // check change of service alert
    cy.get('.update-alert:not(.update-alert--error)').should('be.visible');
  });
});
