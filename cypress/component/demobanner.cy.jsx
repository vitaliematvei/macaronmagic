import DemoBanner from '../../components/DemoBanner';

const mockText =
  'Acesta este un magazin demonstrativ - nicio comandă nu va fi acceptată sau livrată.';

describe('<DemoBanner />', () => {
  it('afișează mesajul magazinului demonstrativ', () => {
    cy.mount(<DemoBanner />);

    cy.get('div.demo-banner-container')
      .should('be.visible')
      .and('have.text', mockText);
  });
});
