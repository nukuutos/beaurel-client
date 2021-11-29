const auth = () => {
  cy.visit('/sign-in');

  cy.intercept('/api/v1/auth/**').as('signIn');

  cy.get('form', { timeout: 60000 }).should('be.visible');

  cy.get('#email').type('nukuutos@gmail.com');
  cy.get('#password').type('123456');

  cy.get('button').click();
  cy.wait('@signIn');
};

export default auth;
