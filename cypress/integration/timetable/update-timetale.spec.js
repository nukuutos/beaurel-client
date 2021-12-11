import auth from '../../utils/auth';
import { addServiceDesktop, deleteServiceDesktop } from '../services/utils';

// update session time to 90min!
const serviceTitle = 'УслугаДляОбновления';
const durationSelect = 0;

describe('Update timetable', () => {
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

    // add tuesday to weekeends
    cy.get(':nth-child(3) > :nth-child(4)').click();
    cy.get('[name="edit.auto.weekends.1"]').click();
    cy.get('.weekends__button').click();

    // select working day start at 09:00
    cy.get('.timetable-card__btn-edit--bottom').click();
    cy.get('.mr-1').select(5);
    cy.get('.timetable-card__btn-edit--primary').click();

    // disable first monday appointment
    cy.get(':nth-child(1) > .weekday__appointments > :nth-child(1)').click();

    // check weekend
    cy.get('.timetable-visual > :nth-child(2) > .weekday__appointments').then(($weekday) => {
      const children = $weekday.children();
      // no appointmetn times;
      expect(children.length).to.equal(0);
    });

    // check working day start at
    cy.get('.timetable-visual').contains('08:00').should('not.exist');
    cy.get('.timetable-visual').contains('09:00').should('be.visible');

    // check disbaled appointemnt
    cy.get('.timetable__form > :nth-child(3)').contains('ПН: 09:00').should('be.visible');

    // open date-picker
    cy.get('.btn--primary').click();
    //  update
    cy.intercept('/api/v1/master/**').as('updateTimetable');
    cy.get('.date-picker__button').click();
    cy.wait('@updateTimetable');
    // button for change services duration
    cy.intercept('/api/v1/master/**').as('getUnsuitableServices');
    cy.get('.update-success__btn').click();
    cy.wait('@getUnsuitableServices');
    // update services
    cy.get('.edit-service__input > .input').each(($input) => cy.wrap($input).select(1));
    // save
    cy.intercept('/api/v1/master/**').as('updateUnsuitableServices');
    cy.get('.services__container > .btn').click();
    cy.wait('@updateUnsuitableServices');
    // check on visualization of updated timetable

    // check weekend
    cy.get(
      '.content > :nth-child(3) > .timetable-visual > :nth-child(2) > .weekday__appointments'
    ).then(($weekday) => {
      const children = $weekday.children();
      // no appointmetn times;
      expect(children.length).to.equal(0);
    });

    // check working day start at
    cy.get('.content > :nth-child(3) > .timetable-visual').contains('08:00').should('not.exist');
    cy.get('.content > :nth-child(3) > .timetable-visual').contains('09:00').should('be.visible');

    // check disbaled appointemnt
    cy.get('.content > :nth-child(3)  .weekday__time--exception').should('be.visible');

    // go to services
    cy.visit('/services');
    // click alert
    cy.get('.update-alert__button').click();
    // check alert
    cy.get('.booking-services > .services__container').then(($container) => {
      const children = $container.children();
      expect(children.length).to.not.equal(0);
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    // change sessionTime to 90 minutes
    cy.get('.timetable-card--edit > .timetable-card__btn-edit').click();
    cy.get('.timetable-card__select').select(2);
    cy.get('.timetable-phone-edit-modal__button').click();

    // add tuesday to weekeends
    cy.get(':nth-child(3) > :nth-child(4)').click();
    cy.get('[name="edit.auto.weekends.1"]').click();
    cy.get('.weekends__button').click();

    // select working day start at 09:00
    cy.get(':nth-child(3) > :nth-child(7)').click();
    cy.get('.mr-1').select(5);
    cy.get('.timetable-phone-edit-modal__button').click();

    // disable first monday appointment
    cy.get(':nth-child(1) > .weekday__appointments > :nth-child(1)').click();

    // check weekend
    cy.get('.timetable-visual > :nth-child(2) > .weekday__appointments').then(($weekday) => {
      const children = $weekday.children();
      // no appointmetn times;
      expect(children.length).to.equal(0);
    });

    // check working day start at
    cy.get('.timetable-visual').contains('08:00').should('not.exist');
    cy.get('.timetable-visual').contains('09:00').should('be.visible');

    // check disbaled appointemnt
    cy.get('.timetable__form > :nth-child(3)').contains('ПН: 09:00').should('be.visible');

    // open date-picker
    cy.get('.btn--primary').click();
    //  update
    cy.intercept('/api/v1/master/**').as('updateTimetable');
    cy.get('.date-picker__button').click();
    cy.wait('@updateTimetable');
    // button for change services duration
    cy.intercept('/api/v1/master/**').as('getUnsuitableServices');
    cy.get('.update-success__btn').click();
    cy.wait('@getUnsuitableServices');
    // update services
    cy.get('.edit-service__input > .input').each(($input) => cy.wrap($input).select(1));
    // save
    cy.intercept('/api/v1/master/**').as('updateUnsuitableServices');
    cy.get('.services__container > .btn').click();
    cy.wait('@updateUnsuitableServices');
    // check on visualization of updated timetable

    // check weekend
    cy.get(
      '.content > :nth-child(3) > .timetable-visual > :nth-child(2) > .weekday__appointments'
    ).then(($weekday) => {
      const children = $weekday.children();
      // no appointmetn times;
      expect(children.length).to.equal(0);
    });

    // check working day start at
    cy.get('.content > :nth-child(3) > .timetable-visual').contains('08:00').should('not.exist');
    cy.get('.content > :nth-child(3) > .timetable-visual').contains('09:00').should('be.visible');

    // check disbaled appointemnt
    cy.get('.content > :nth-child(3)  .weekday__time--exception').should('be.visible');

    // go to services
    cy.visit('/services');
    // click alert
    cy.get('.update-alert__button').click();
    // check alert
    cy.get('.booking-services > .services__container').then(($container) => {
      const children = $container.children();
      expect(children.length).to.not.equal(0);
    });
  });
});
