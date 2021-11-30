import auth from '../../utils/auth';

describe('Star masters', () => {
  beforeEach(() => {
    auth();
    cy.visit('/masters');
    // unstar masters
    cy.get('.content')
      .should('be.visible')
      .then(($content) => {
        if ($content.find('.star-profile:not(.star-profile--invisible)').length > 0) {
          cy.intercept('DELETE', '/api/v1/profile/**').as('unstartMaster');
          cy.get('.star-profile:not(.star-profile--invisible)').click({
            multiple: true,
            force: true,
          });
          cy.wait('@unstartMaster');
        }
      });
  });

  it('Desktop', () => {
    cy.visit('/search');
    cy.get('.content').should('be.visible');

    cy.intercept('POST', '/api/v1/profile/**').as('startMaster');
    cy.get('.star-profile--invisible').first().click();
    cy.wait('@startMaster');

    cy.intercept('POST', '/api/v1/profile/**').as('startMaster');
    cy.get('.star-profile--invisible').first().click();
    cy.wait('@startMaster');

    cy.visit('/masters');

    cy.get('.star-profile.star-profile--unstar').should('have.length', 2);
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.visit('/search');
    cy.get('.content').should('be.visible');

    cy.intercept('POST', '/api/v1/profile/**').as('startMaster');
    cy.get('.star-profile--invisible').first().click();
    cy.wait('@startMaster');

    cy.intercept('POST', '/api/v1/profile/**').as('startMaster');
    cy.get('.star-profile--invisible').first().click();
    cy.wait('@startMaster');

    cy.visit('/masters');

    cy.get('.star-profile.star-profile--unstar').should('have.length', 2);
  });
});
