export const addServiceDesktop = ({ title, price = 2132, durationSelect = 1 }) => {
  cy.get('.service--add').click();
  cy.get('#title').type(title);
  cy.get('.add-service__duration > .input--icon > .input').select(durationSelect);
  cy.get('.add-service__price > .input--icon > .input').type(price);
  cy.intercept('POST', '/api/v1/master/**').as('addService');
  cy.get('.add-service__button').click();
  cy.wait('@addService').then((xhr) => {
    expect(xhr.response.statusCode).to.equal(201);
  });
};

export const addServiceParameter = ({ title, subServices }) => {
  cy.get('.service--add').click();
  cy.get('[for="service-parameter"]').click();
  cy.get('#title').type(title);

  subServices.forEach(({ parameter, price = 1231 }, index) => {
    cy.get(`input[name="subServices.${index}.parameter"]`).type(parameter);
    cy.get(`select[name="subServices.${index}.duration"]`).select(1);
    cy.get(`input[name="subServices.${index}.price"]`).type(price);

    if (index !== subServices.length - 1) cy.get('.add-service__add').click();
  });

  cy.intercept('POST', '/api/v1/master/**').as('addServiceParameter');

  cy.get('.add-service__button').click();

  cy.wait('@addServiceParameter').then((xhr) => {
    expect(xhr.response.statusCode).to.equal(201);
  });
};

export const findService = (title, action) => {
  cy.get('.service__title')
    .contains(title)
    .parents('.service')
    .within(() => {
      action();
    });
};

export const checkServiceAppearence = ({ title, price }) => {
  const durationRegexp = /^[0-2][0-9]:[0-5][0-9]$/;
  cy.get('.service').contains(title).should('be.visible');
  findService(title, () => {
    cy.get('.service__price').contains(price).should('be.visible');
    cy.get('.service__duration').contains(durationRegexp).should('be.visible');
  });
};

export const deleteServiceDesktop = (title) => {
  cy.get('.services__container').then(($container) => {
    if ($container.find(`:contains('${title}')`).length > 0) {
      cy.intercept('DELETE', '/api/v1/master/**').as('deleteService');
      findService(title, () => cy.get('.btn-icon--fail').click());
      cy.wait('@deleteService');
    }
  });
};
