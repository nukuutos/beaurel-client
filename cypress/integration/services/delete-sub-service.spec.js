import auth from '../../utils/auth';
import { addServiceParameter, deleteServiceDesktop, findService } from './utils';

const title = 'Хорошее такое название';
const subServiceParameter0 = 'Параметр0';
const subServiceParameter1 = 'Параметр1';
const price = 2131;

describe('Delete sub-service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(title);
    addServiceParameter({
      title,
      subServices: [
        { parameter: subServiceParameter0, price },
        { parameter: subServiceParameter1, price },
      ],
    });
  });

  it('Desktop', () => {
    cy.get('.service').contains(title).should('be.visible').click();
    cy.get('.service').contains(subServiceParameter1).should('be.visible');

    deleteServiceDesktop(subServiceParameter0);

    cy.get('.service').contains(subServiceParameter0).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.intercept('/api/v1/master/**').as('deleteService');

    findService(title, () => {
      cy.get('.service__mobile-buttons > :nth-child(1)').click();
    });

    cy.wait('@deleteService').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    cy.get('.service').contains(subServiceParameter0).should('not.exist');
  });
});
