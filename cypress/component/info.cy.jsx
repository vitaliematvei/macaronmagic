import Info from '../../components/Info';

describe('<Info />', () => {
  it('afișează filele și informațiile produsului', () => {
    cy.mount(
      <Info
        ingredients="Migdale, zahăr și albuș de ou"
        weight="335g"
        delivery="Livrare în Regatul Unit"
      />,
    );

    cy.get('div.react-tabs').should('be.visible');
    cy.get('ul[role="tablist"] > li').should('have.length', 2);
    cy.get('ul[role="tablist"] > li:nth-child(1)').should(
      'have.text',
      'Description',
    );
    cy.get('ul[role="tablist"] > li:nth-child(2)').should(
      'have.text',
      'Additional Information',
    );
  });
});
