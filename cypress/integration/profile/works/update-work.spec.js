import auth from '../../../utils/auth';

const newWorkTitle = 'Новое название';
const currentWorkTitle = 'Название';

describe('Update Work', () => {
  beforeEach(() => {
    // auth
    auth();
    // intercept request
    cy.intercept('/api/v1/master/**').as('getWorks');
    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();

    cy.wait('@getWorks').then(() => {
      // delete work with updated title
      cy.get('.master-work__title').each(($figcaption) => {
        const text = $figcaption.text();
        if (text === newWorkTitle) {
          cy.wrap($figcaption).click({ force: true });
          // delete
          cy.get('.btn-icon--fail').click();
          return false;
        }
      });
      // add work
      let isWork;
      cy.get('.master-work__title').each(($figcaption) => {
        const text = $figcaption.text();
        if (text === currentWorkTitle) {
          isWork = true;
          return false;
        }
      });

      if (isWork) return;

      // click on add work
      cy.get('.master-works__add-work').click();
      // click on upload image
      cy.get('.add-master-work__upload-input').attachFile('work.jpg');
      // add-title
      cy.get('#title').type(currentWorkTitle);
      // add-work
      cy.intercept('/api/v1/master/**').as('addWork');
      // save
      cy.get('.btn--primary').click();
      // wait req
      cy.wait('@addWork');
    });
    // close modal
    cy.get('.fa-times').click();
  });

  it('Desktop', () => {
    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();

    cy.intercept('/api/v1/master/**').as('updateWork');

    // update work
    cy.get('.master-work__title')
      .contains(currentWorkTitle)
      .then(($element) => {
        cy.wrap($element).click({ force: true });
        // click btn edit
        cy.get('.btn-icon.mr-2').click();
        // new work title
        cy.get('#title').clear().type(newWorkTitle);
        // save
        cy.get('.btn--primary').click();
      });

    cy.wait('@updateWork').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
      // close carousel view
      cy.get('.fa-times').click();

      const oldTitleRegex = new RegExp(`^${currentWorkTitle}$`);
      const newTitleRegex = new RegExp(`^${newWorkTitle}$`);

      cy.get('.master-work__title').contains(oldTitleRegex).should('not.exist');
      cy.get('.master-work__title').contains(newTitleRegex).should('exist');
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();

    cy.intercept('/api/v1/master/**').as('updateWork');

    // update work
    cy.get('.master-work__title')
      .contains(currentWorkTitle)
      .then(($element) => {
        cy.wrap($element).click({ force: true });
        // click btn edit
        cy.get('.btn-icon.mr-2').click();
        // new work title
        cy.get('#title').clear().type(newWorkTitle);
        // save
        cy.get('.btn--primary').click();
      });

    cy.wait('@updateWork').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
      // close carousel view
      cy.get('.back-bar__main > .svg-inline--fa').click();

      const oldTitleRegex = new RegExp(`^${currentWorkTitle}$`);
      const newTitleRegex = new RegExp(`^${newWorkTitle}$`);

      cy.get('.master-work__title').contains(oldTitleRegex).should('not.exist');
      cy.get('.master-work__title').contains(newTitleRegex).should('exist');
    });
  });
});
