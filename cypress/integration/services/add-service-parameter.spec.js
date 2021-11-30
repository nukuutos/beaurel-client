import auth from '../../utils/auth';
import { addServiceParameter, deleteServiceDesktop } from './utils';

const title = 'Хорошее такое название';
const subServiceParameter0 = 'Параметр0';
const subServiceParameter1 = 'Параметр1';
const durationRegexp = /^[0-2][0-9]:[0-5][0-9]$/;
const price = 2131;

const checkForSubServiceAppearence = (parameterName) => {
  cy.get('.service__title').contains(parameterName).should('be.visible');
  cy.get('.service:not(.service.service--add)').each(($service) => {
    cy.wrap($service).within(() =>
      cy.get('.service__title').then(($title) => {
        const text = $title.text();
        if (text === parameterName) {
          // price
          cy.get('.service__side--right > .mt-5').contains(price).should('be.visible');
          // duration
          cy.get('.service__side--right > .mt-1').contains(durationRegexp).should('be.visible');
          return false;
        }
        return true;
      })
    );
  });
};

describe('Add service-parameter', () => {
  beforeEach(() => {
    auth();
    cy.visit('/services');
    deleteServiceDesktop(title);
  });

  it('Desktop', () => {
    addServiceParameter({
      title,
      subServices: [
        { parameter: subServiceParameter0, price },
        { parameter: subServiceParameter1, price },
      ],
    });

    cy.get('.service__title').contains(title).should('be.visible').click();
    checkForSubServiceAppearence(subServiceParameter0);
    checkForSubServiceAppearence(subServiceParameter1);
  });

  it('Phone', () => {
    cy.viewport(330, 500);

    addServiceParameter({
      title,
      subServices: [
        { parameter: subServiceParameter0, price },
        { parameter: subServiceParameter1, price },
      ],
    });

    cy.get('.service__title').contains(title).should('be.visible').click();
    checkForSubServiceAppearence(subServiceParameter0);
    checkForSubServiceAppearence(subServiceParameter1);
  });
});
