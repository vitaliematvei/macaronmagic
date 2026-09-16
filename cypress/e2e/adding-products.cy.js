describe('Adding Products', () => {
  it('should add a product to the cart', () => {
    cy.visit('/');

    cy.get('#primary-navigation a[href="/shop"]').click();
    cy.url().should('include', '/shop');

    cy.get('.products-container a').first().click();
    cy.get('.product-detail-desc h1').invoke('text').as('productName');
    cy.get('.product-detail-desc .price').invoke('text').as('productPrice');
    cy.get('span.plus').click();
    cy.get('button.add-to-cart').click();

    cy.get('span.cart-item-qty').should('contain', '2').click();
    cy.get('span.cart-num-items').should('contain', '(2)');
    cy.get('@productName').then((productName) => {
      cy.get('.item-desc').should('contain', productName.trim());
    });
    cy.get('@productPrice').then((productPrice) => {
      cy.get('.item-desc').should('contain', `2 @ ${productPrice.trim()}`);
    });
    cy.get('div.total > h4').should('contain', '$');
  });
});
