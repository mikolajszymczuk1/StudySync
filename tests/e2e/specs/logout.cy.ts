describe('Logout process', () => {
  it('Logout from user account', () => {
    cy.login('cypress', 'password123');
    cy.wait(400);
    cy.get('[data-cy="sideMenuButton"]').click({ multiple: true, force: true });
    cy.get('[data-cy="logoutButton"]').click();
    cy.get('[data-cy="tabHeadingLogin"]').contains('Login to your account');
  });
});
