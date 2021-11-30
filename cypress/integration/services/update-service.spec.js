import auth from '../../utils/auth';
import {
  addServiceDesktop,
  checkServiceAppearence,
  deleteServiceDesktop,
  findService,
} from './utils';

const currentServiceTitle = 'Хорошее такое название';
const newServiceTitle = 'Такое название';
const currentPrice = 2131;
const newPrice = 32;

describe('Update service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(currentServiceTitle);
    deleteServiceDesktop(newServiceTitle);
    addServiceDesktop({ title: currentServiceTitle, price: currentPrice });
  });

  it('Desktop', () => {
    cy.get('.service').contains(currentServiceTitle).should('be.visible');
    // click edit button
    findService(currentServiceTitle, () => cy.get('.service__btn--first').click());
    // edit
    cy.get('.edit-service__textarea').clear().type(newServiceTitle);
    cy.get('.service__side--right > :nth-child(1) > .input').select(0);
    cy.get(':nth-child(2) > .input').clear().type(newPrice);
    cy.intercept('/api/v1/master/**').as('updateService');
    cy.get('form.service > .service__btn--first').click();
    cy.wait('@updateService').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    checkServiceAppearence({ title: newServiceTitle, price: newPrice });
    cy.get('.service').contains(currentServiceTitle).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.service').contains(currentServiceTitle).should('be.visible');
    // click edit button
    findService(currentServiceTitle, () =>
      cy.get('.service__mobile-buttons > :nth-child(2)').click()
    );
    // udpate service
    cy.get('.edit-service__textarea').clear().type(newServiceTitle);
    cy.get('.service__side--right > :nth-child(1) > .input').select(0);
    cy.get(':nth-child(2) > .input').clear().type(newPrice);
    cy.intercept('/api/v1/master/**').as('updateService');
    cy.get('.service__btn--confirm').click();
    cy.wait('@updateService').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    checkServiceAppearence({ title: newServiceTitle, price: newPrice });
    cy.get('.service').contains(currentServiceTitle).should('not.exist');
  });
});
