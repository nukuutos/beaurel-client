import auth from '../../utils/auth';

describe('Get masters by scroll', () => {
  beforeEach(() => {
    auth();
    cy.visit('/search');
  });

  it('Desktop', () => {
    cy.get('.content').then(($content) => {
      const currentChildren = $content.children();

      cy.intercept('/api/v1/master**').as('getMasters');
      cy.window().scrollTo('bottom');
      cy.wait('@getMasters');

      cy.wrap($content).then(($content) => {
        const nextChildren = $content.children();
        expect(currentChildren.length).to.be.lessThan(nextChildren.length);
      });
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    cy.get('.content').then(($content) => {
      const currentChildren = $content.children();

      cy.intercept('/api/v1/master**').as('getMasters');
      cy.window().scrollTo('bottom');
      cy.wait('@getMasters');

      cy.wrap($content).then(($content) => {
        const nextChildren = $content.children();
        expect(currentChildren.length).to.be.lessThan(nextChildren.length);
      });
    });
  });
});
