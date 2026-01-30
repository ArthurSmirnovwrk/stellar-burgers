/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
});

Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
});

Cypress.Commands.add('mockOrder', () => {
  cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('orderBurger');
});

Cypress.Commands.add('setToken', () => {
  cy.window().then((window) => {
    window.localStorage.setItem('accessToken', 'mock-access-token');
    window.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });
  cy.setCookie('accessToken', 'mock-access-token');
  cy.setCookie('refreshToken', 'mock-refresh-token');
});

Cypress.Commands.overwrite('clearLocalStorage', () => {
  cy.window().then((window) => {
    window.localStorage.clear();
  });
});

Cypress.Commands.add('clearAuthCookies', () => {
  cy.clearCookie('accessToken');
  cy.clearCookie('refreshToken');
});