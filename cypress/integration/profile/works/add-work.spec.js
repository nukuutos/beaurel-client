import auth from '../../../utils/auth';

const workTitle = 'Ухахаха';

describe('Work', () => {
  beforeEach(() => {
    // auth
    auth();
    // intercept request
    cy.intercept('/api/v1/master/**').as('getWorks');
    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();
    // delete image (clean up)
    cy.wait('@getWorks').then(() => {
      cy.get('.master-work__title').each(($figcaption) => {
        const text = $figcaption.text();
        if (text === workTitle) {
          cy.wrap($figcaption).click({ force: true });
          //  close modal
          cy.get('.btn-icon--fail').click();

          return false;
        }
      });
    });

    cy.get('.fa-times').click();
  });

  it('Desktop', () => {
    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();
    cy.get('.master-works').then(($element) => {
      // get current length of works(including add-button)
      const initialChildrenLength = $element.children().length;
      // click on add work
      cy.get('.master-works__add-work').click();
      // click on upload image
      cy.get('.add-master-work__upload-input').attachFile('work.jpg');
      // add-title
      cy.get('#title').type(workTitle);
      // listen for request
      cy.intercept('/api/v1/master/**').as('addWork');
      // save
      cy.get('.btn--primary').click();
      // compare length
      cy.wait('@addWork').then((xhr) => {
        expect(xhr.response.statusCode).to.equal(201);

        cy.get('.master-works').then(($element) => {
          const childrenLength = $element.children().length;
          expect(initialChildrenLength).to.be.lessThan(childrenLength);
        });
      });
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    // click on works
    cy.get('.profile__cards > :nth-child(3) > img').click();
    cy.get('.master-works').then(($element) => {
      // get current length of works(including add-button)
      const initialChildrenLength = $element.children().length;
      // click on add work
      cy.get('.master-works__add-work').click();
      // click on upload image
      cy.get('.add-master-work__upload-input').attachFile('work.jpg');
      // add-title
      cy.get('#title').type(workTitle);
      // listen for request
      cy.intercept('/api/v1/master/**').as('addWork');
      // save
      cy.get('.btn--primary').click();
      // compare length
      cy.wait('@addWork').then((xhr) => {
        expect(xhr.response.statusCode).to.equal(201);

        cy.get('.master-works').then(($element) => {
          const childrenLength = $element.children().length;
          expect(initialChildrenLength).to.be.lessThan(childrenLength);
        });
      });
    });
  });
});
