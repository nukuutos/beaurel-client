import auth from '../../utils/auth';
import { addServiceDesktop, deleteServiceDesktop, findService } from './utils';

const title = 'Хорошее такое название';
const price = 2131;

describe('Delete service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(title);
    addServiceDesktop({ title, price });
  });

  it('Desktop', () => {
    cy.get('.service').contains(title).should('be.visible');
    deleteServiceDesktop(title);
    cy.get('.service').contains(title).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.service').contains(title).should('be.visible');
    // click delete button
    findService(title, () => {
      cy.intercept('/api/v1/master/**').as('deleteService');
      cy.get('.service__mobile-buttons > :nth-child(1)').click();
      cy.wait('@deleteService').then((xhr) => {
        expect(xhr.response.statusCode).to.equal(200);
      });
    });

    cy.get('.service').contains(title).should('not.exist');
  });
});
