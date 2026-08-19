import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { HiMiniMinusSmall } from 'react-icons/hi2';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image).url()} width={250} alt={name} />
          <p className="product-name">{name}</p>
          <p className="product-price">
            $
            {price.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
