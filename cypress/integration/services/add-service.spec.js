import auth from '../../utils/auth';
import { addServiceDesktop, checkServiceAppearence, deleteServiceDesktop } from './utils';

const title = 'Хорошее такое название';
const price = 2131;

describe('Add service', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(title);
  });

  it('Desktop', () => {
    addServiceDesktop({ title, price });
    checkServiceAppearence({ title, price });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.service--add').click();
    cy.get('#title').type(title);
    cy.get('.add-service__duration > .input--icon > .input').select(1);
    cy.get('.add-service__price > .input--icon > .input').type(price);

    cy.intercept('/api/v1/master/**').as('addService');

    cy.get('.add-service__button').click();

    cy.wait('@addService').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(201);
    });

    checkServiceAppearence({ title, price });
  });
});
