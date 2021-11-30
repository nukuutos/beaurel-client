import auth from '../../utils/auth';
import { addServiceParameter, deleteServiceDesktop, findService } from './utils';

const currentServiceTitle = 'Хорошее такое название';
const newServiceTitle = 'Такое название';
const subServiceParameter0 = 'Параметр0';
const subServiceParameter1 = 'Параметр1';
const currentPrice = 2131;

describe('Update service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    // delete service with current and new titles
    deleteServiceDesktop(currentServiceTitle);
    deleteServiceDesktop(newServiceTitle);
    addServiceParameter({
      title: currentServiceTitle,
      subServices: [
        { parameter: subServiceParameter0, price: currentPrice },
        { parameter: subServiceParameter1, price: currentPrice },
      ],
    });
  });

  it('Desktop', () => {
    cy.get('.service').contains(currentServiceTitle).should('be.visible');
    // click edit button
    findService(currentServiceTitle, () => cy.get('.service__btn--first').click());
    // edit
    cy.get('.edit-service__textarea').clear().type(newServiceTitle);
    cy.intercept('/api/v1/master/**').as('updateServiceParameter');
    cy.get('form.service > .service__btn--first').click();
    cy.wait('@updateServiceParameter').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    cy.get('.service').contains(newServiceTitle).should('be.visible');
    cy.get('.service').contains(currentServiceTitle).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.service').contains(currentServiceTitle).should('be.visible');
    // click edit button
    findService(currentServiceTitle, () =>
      cy.get('.service__mobile-buttons > :nth-child(2)').click()
    );
    // edit
    cy.get('.edit-service__textarea').clear().type(newServiceTitle);
    cy.intercept('/api/v1/master/**').as('updateServiceParameter');
    cy.get('.service__btn--confirm').click();
    cy.wait('@updateServiceParameter').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    cy.get('.service').contains(newServiceTitle).should('be.visible');
    cy.get('.service').contains(currentServiceTitle).should('not.exist');
  });
});
