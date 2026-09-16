import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { eUSLocale } from '../lib/utils';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

const Product = ({ product: { image, name, slug, price } }) => {
  if (!image || !name || !slug || !price) return null;

  const imageSource = Array.isArray(image) ? image[0] : image;
  const imageUrl = imageSource ? urlFor(imageSource).url() : '';
  const productSlug = slug?.current || '';

  const { asPath } = useRouter();
  let seoProductSlug = asPath.split('/')[2];
  let setProductName = '';

  if (seoProductSlug != null) {
    setProductName = seoProductSlug.replace(/-/g, ' ');
    if (seoProductSlug === slug.current) {
      setProductName = toTitleCase(seoProductSlug.replace(/-/g, ' '));
    }
  }

  return (
    <>
      <NextSeo
        title={`${toTitleCase(setProductName)} - Macaron Magic`}
        description="Great tasting home-made macarons"
        openGraph={{
          title: toTitleCase(setProductName),
          description: `Buy ${name} for $${eUSLocale(price)}`,
          images: [
            {
              url: imageUrl,
              alt: name || 'Product',
            },
          ],
        }}
      />
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
    </>
  );
};

export default Product;
