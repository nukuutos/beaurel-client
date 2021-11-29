import auth from '../../utils/auth';

describe('Avatar', () => {
  beforeEach(() => {
    auth();
  });

  it('is changed by user', () => {
    // click on change avatar
    cy.get(
      '#__next > div:nth-child(1) > main > header > div:nth-child(1) > div:nth-child(1) > div'
    ).click();

    // new avatar
    cy.get('.select__input').attachFile('avatar.jpg');
    cy.intercept('/api/v1/profile/**').as('updateAvatar');

    // save it
    cy.get('.btn--primary').click();

    // check status code
    cy.wait('@updateAvatar').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });
  });

  it('is changed by user (phone viewport)', () => {
    cy.viewport(330, 500);

    // click on change avatar
    cy.get(
      '#__next > div:nth-child(1) > main > header > div:nth-child(1) > div:nth-child(1) > div'
    ).click();

    // new avatar
    cy.get('.select__input').attachFile('avatar.jpg');
    cy.intercept('/api/v1/profile/**').as('updateAvatar');

    // save it
    cy.get('.btn--primary').click();

    // check status code
    cy.wait('@updateAvatar').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });
  });
});
