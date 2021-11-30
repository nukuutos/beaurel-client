import auth from '../../utils/auth';
import { addServiceParameter, deleteServiceDesktop, findService } from './utils';

const currentServiceTitle = 'Хорошее такое название';
const currentSubServiceParameter = 'Параметр0';
const newSubServiceParameter = 'Параметр1';
const currentPrice = 2131;
const newPrice = 32;

const checkSubServiceAppearence = ({ parameter, price }) => {
  const durationRegexp = /^[0-2][0-9]:[0-5][0-9]$/;
  cy.get('.service').contains(parameter).should('be.visible');
  findService(parameter, () => {
    cy.get('.service__side--right > .mt-5').contains(price).should('be.visible');
    cy.get('.service__side--right > .mt-1').contains(durationRegexp).should('be.visible');
  });
};

describe('Update sub-service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(currentServiceTitle);
    addServiceParameter({
      title: currentServiceTitle,
      subServices: [{ parameter: currentSubServiceParameter, price: currentPrice }],
    });
  });

  it('Desktop', () => {
    cy.get('.service').contains(currentServiceTitle).should('be.visible').click();
    cy.get('.service').contains(currentSubServiceParameter).should('be.visible');
    // click edit button
    findService(currentSubServiceParameter, () => cy.get('.service__btn--first').click());
    // edit
    cy.get('.edit-service__textarea').clear().type(newSubServiceParameter);
    cy.get('.service__side--right > :nth-child(1) > .input').select(0);
    cy.get(':nth-child(2) > .input').clear().type(newPrice);
    cy.intercept('/api/v1/master/**').as('updateServiceParameter');
    cy.get('form.service > .service__btn--first').click();
    cy.wait('@updateServiceParameter').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    checkSubServiceAppearence({ parameter: newSubServiceParameter, price: newPrice });
    cy.get('.service').contains(currentSubServiceParameter).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);
    cy.get('.service').contains(currentServiceTitle).should('be.visible').click();
    cy.get('.service').contains(currentSubServiceParameter).should('be.visible');
    // click edit button
    findService(currentSubServiceParameter, () =>
      cy.get('.service__mobile-buttons > :nth-child(2)').click()
    );

    cy.get('.edit-service__textarea').clear().type(newSubServiceParameter);
    cy.get('.service__side--right > :nth-child(1) > .input').select(0);
    cy.get(':nth-child(2) > .input').clear().type(newPrice);
    cy.intercept('/api/v1/master/**').as('updateServiceParameter');
    cy.get('.service__btn--confirm').click();
    cy.wait('@updateServiceParameter').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    checkSubServiceAppearence({ parameter: newSubServiceParameter, price: newPrice });
    cy.get('.service').contains(currentSubServiceParameter).should('not.exist');
  });
});
