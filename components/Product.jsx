import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { eUSLocale } from '../lib/utils';

const Product = ({ product }) => {
  if (!product) return null;

  const { image, name, slug, price } = product;
  const imageSource = Array.isArray(image) ? image[0] : image;
  const imageUrl = imageSource ? urlFor(imageSource).url() : '';
  const productSlug = slug?.current || '';

  return (
    <div>
      <Link href={`/product/${productSlug}`}>
        <div className="product-card">
          <figure className="fliptile">
            {imageUrl && (
              <img
                src={imageUrl}
                width={250}
                height={250}
                className="product-image"
                alt={name || 'Product'}
              />
            )}
            <figcaption>
              <p className="product-name">{name}</p>
            </figcaption>
          </figure>
          <p className="product-price">${eUSLocale(price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
