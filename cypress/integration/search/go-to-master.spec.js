import auth from '../../utils/auth';

describe('Go to master in search', () => {
  beforeEach(() => {
    auth();
    cy.visit('/search');
  });

  it('Desktop', () => {
    // click first master in search
    cy.get('.content > :nth-child(3)').click();
    // check for profile visibility
    cy.get('.profile__header').should('be.visible');
  });

  it('Phone', () => {
    cy.viewport(330, 500);
    // click first master in search
    cy.get('.content > :nth-child(3)').click();
    // check for profile visibility
    cy.get('.profile__header').should('be.visible');
  });
});
