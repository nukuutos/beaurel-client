import auth from '../../utils/auth';
import { getRandomLength } from '../../utils/methods';

const basicAboutText =
  'Lorem dolor sit amet consectetur adipisicing elit. Molestias sequi recusandae saepe, sunt optio provident repellat. Lorem ipsum dolor sit ameorib jkdf';

describe('Update about text', () => {
  beforeEach(() => {
    auth();
  });

  it('Desktop', () => {
    // get random about text
    const [start, end] = getRandomLength(0, 151);
    const aboutText = basicAboutText.slice(start, end).trim();

    // click on change about text
    cy.get('.profile__about > svg').click();

    // new about text
    cy.get('.edit-about__textarea').clear().type(aboutText);
    cy.intercept('/api/v1/profile/**').as('updateAboutText');

    // save it
    cy.get('.btn--primary').click();

    // check status code
    cy.wait('@updateAboutText').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    // check text
    cy.get('.profile__about').should(($element) => {
      const text = $element.text();
      expect(text).to.equal(aboutText);
    });
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    // get random about text
    const [start, end] = getRandomLength(0, 151);
    const aboutText = basicAboutText.slice(start, end).trim();

    // click on change about text
    cy.get('.profile__about > svg').click();

    // new about text
    cy.get('.edit-about__textarea').clear().type(aboutText);
    cy.intercept('/api/v1/profile/**').as('updateAboutText');

    // save it
    cy.get('.btn--primary').click();

    // check status code
    cy.wait('@updateAboutText').then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });

    // check text
    cy.get('.profile__about').should(($element) => {
      const text = $element.text();
      expect(text).to.equal(aboutText);
    });
  });
});
