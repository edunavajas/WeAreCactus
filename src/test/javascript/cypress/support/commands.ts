// Navbar
export const navbarSelector = '[data-cy="navbar"]';
export const adminMenuSelector = '[data-cy="adminMenu"]';
export const accountMenuSelector = '[data-cy="accountMenu"]';
export const registerItemSelector = '[data-cy="register"]';
export const settingsItemSelector = '[data-cy="settings"]';
export const passwordItemSelector = '[data-cy="passwordItem"]';
export const loginItemSelector = '[data-cy="login"]';
export const logoutItemSelector = '[data-cy="logout"]';
export const entityItemSelector = '[data-cy="entity"]';

// Login
export const titleLoginSelector = '[data-cy="loginTitle"]';
export const errorLoginSelector = '[data-cy="loginError"]';
export const usernameLoginSelector = '[data-cy="username"]';
export const passwordLoginSelector = '[data-cy="password"]';
export const forgetYourPasswordSelector = '[data-cy="forgetYourPasswordSelector"]';
export const submitLoginSelector = '[data-cy="submit"]';

export const classInvalid = 'ng-invalid';

export const classValid = 'ng-valid';

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.clickOnLoginItem();
  cy.get(usernameLoginSelector).type(username);
  cy.get(passwordLoginSelector).type(password);
  cy.get(submitLoginSelector).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(username: string, password: string): Cypress.Chainable;
    }
  }
}

// Convert this to a module instead of script (allows import/export)
export {};
