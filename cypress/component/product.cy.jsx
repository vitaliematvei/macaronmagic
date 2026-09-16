import React from 'react';
import Product from '../../components/Product';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const mockProduct = {
  _id: 'product-1',
  image: [],
  name: 'Chocolate Orange',
  price: 18.5,
  slug: { current: 'chocolate-orange' },
};

const mockRouter = {
  asPath: '/shop',
  basePath: '',
  pathname: '/shop',
  query: {},
  route: '/shop',
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => undefined,
  back: () => undefined,
  prefetch: () => Promise.resolve(),
  beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
};

describe('<Product />', () => {
  it('afișează numele și prețul produsului', () => {
    cy.mount(
      <RouterContext.Provider value={mockRouter}>
        <Product product={mockProduct} />
      </RouterContext.Provider>,
    );

    cy.get('div.product-card').should('be.visible');
    cy.get('p.product-name').should('have.text', mockProduct.name);
    cy.get('p.product-price').should('have.text', '$18.50');
  });
});
