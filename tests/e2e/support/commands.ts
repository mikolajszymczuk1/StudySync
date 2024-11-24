/// <reference types="cypress" />

import '@4tw/cypress-drag-drop';

Cypress.Commands.add('createAccount', (username: string, password: string) => {
  cy.visit('/register');
  cy.get('[data-cy="registerUsernameInput"] input').type(username);
  cy.get('[data-cy="registerPasswordInput"] input').type(password);
  cy.get('[data-cy="registerRepeatPasswordInput"] input').type('password123');
  cy.get('[data-cy="registerButton"]').click();
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="loginUsernameInput"] input').type(username);
  cy.get('[data-cy="loginPasswordInput"] input').type(password);
  cy.get('[data-cy="loginButton"]').click();
});

Cypress.Commands.add('removeAllTodos', () => {
  cy.get('[data-cy="singleTodo"]').each((todo) => {
    cy.wrap(todo).find('[data-cy="todoTrashButton"]').click();
  });
});

Cypress.Commands.add('createTodo', (name: string) => {
  cy.get('[data-cy="addTodoButton"]').click();
  cy.get('[data-cy="todoNameInput"]').type(name);
  cy.get('[data-cy="modalUpdateSaveButton"]').click();
});

Cypress.Commands.add('removeAllSubjects', () => {
  cy.addSubject('test', 'test', 'Monday');
  cy.get('[data-cy="subjectCard"]').each((subjectCard) => {
    cy.wrap(subjectCard).as('card').click({ force: true });
    cy.get('[data-cy="modalDeleteButton"]').click();
    cy.wait(400);
  });
  cy.wait(200);
});

Cypress.Commands.add(
  'addSubject',
  (name: string, classRoom: string, day: string) => {
    cy.get(`[data-cy="subjectsAddSubjectButton_${day}"]`).click({
      force: true,
    });
    cy.wait(400);
    cy.get('[data-cy="subjectNameInput"]').type(name);
    cy.get('[data-cy="subjectClassroomInput"]').type(classRoom);
    cy.get('[data-cy="modalUpdateSaveButton"]').click();
    cy.wait(400);
  },
);
