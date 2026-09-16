describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('/');
    cy.url().should('include', '/');

    cy.get('#primary-navigation a[href="/about"]').click();
    cy.url().should('include', '/about');

    cy.get('.about-us').should('contain.text', 'Despre Macaron Magic');
  });
});
