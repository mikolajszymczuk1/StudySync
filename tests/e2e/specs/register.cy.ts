describe('Create new account process', (): void => {
  it('Open register page', (): void => {
    cy.visit('/register');
  });

  it('Create new cypress account', (): void => {
    cy.visit('/register');
    cy.get('[data-cy="registerUsernameInput"] input').type('cypress');
    cy.get('[data-cy="registerPasswordInput"] input').type('password123');
    cy.get('[data-cy="registerRepeatPasswordInput"] input').type('password123');
    cy.get('[data-cy="registerButton"]').click();
  });
});
