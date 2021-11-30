import auth from '../../utils/auth';
import { addServiceParameter, deleteServiceDesktop, findService } from './utils';

const title = 'Хорошее такое название';
const subServiceParameter0 = 'Параметр0';
const price = 2131;

describe('Delete service-parameter', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(title);
    addServiceParameter({
      title,
      subServices: [{ parameter: subServiceParameter0, price }],
    });
  });

  it('Desktop', () => {
    cy.get('.service__title').contains(title).should('be.visible');

    deleteServiceDesktop(title);

    cy.get('.service__title').contains(title).should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.service__title').contains(title).should('be.visible');

    findService(title, () => {
      cy.intercept('/api/v1/master/**').as('deleteService');
      cy.get('.service__mobile-buttons > :nth-child(1)').click();
      cy.wait('@deleteService').then((xhr) => {
        expect(xhr.response.statusCode).to.equal(200);
      });
    });

    cy.get('.service__title').contains(title).should('not.exist');
  });
});
