describe('Login process', (): void => {
  before(() => {
    cy.createAccount('cypress', 'password123');
  });

  it('Open login page', (): void => {
    cy.visit('/login');
  });

  it('Wrong username or password', (): void => {
    cy.login('test', 'test');
    cy.get('[data-cy="loginUsernameInput"]')
      .find('[data-cy="commonInputErrorMessage"]')
      .contains('- Wrong username or password');
  });

  it('Login successfully', (): void => {
    cy.login('cypress', 'password123');
  });
});
