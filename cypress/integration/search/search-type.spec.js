import auth from '../../utils/auth';

describe('Go to master in search', () => {
  beforeEach(() => {
    auth();
    cy.visit('/search');
  });

  it('Desktop', () => {
    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').type('Никита Волошин');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Чтото интересное');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('not.exist');

    cy.get('.search__specialization > .input').select('Визажист');
    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.search__specialization > .input').select('Парикмахер');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('not.exist');
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').type('Никита Волошин');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Чтото интересное');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('not.exist');

    cy.get('.search__specialization > .input').select('Визажист');
    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.input--icon > .input').clear().type('Волошин Никита');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('be.visible');

    cy.intercept('/api/v1/master**').as('getMasters');
    cy.get('.search__specialization > .input').select('Парикмахер');
    cy.wait('@getMasters');
    cy.get('.search__master-card').should('not.exist');
  });
});
