import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from '../../lib/client';
import { Info, Product, StarRating } from '../../components';
import { eUSLocale } from '../../lib/utils';

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  if (!product) return null;

  const { image, name, details, price, sku, ingredients, weight, delivery } =
    product;
  const images = Array.isArray(image) ? image : image ? [image] : [];
  const mainImageUrl = images[index] ? urlFor(images[index]).url() : '';

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {mainImageUrl && (
              <img
                src={mainImageUrl}
                className="product-detail-image"
                alt={name}
              />
            )}
          </div>
          <div className="small-images-container">
            {images.map((item, i) => (
              <img
                key={item._key || i}
                src={urlFor(item).url()}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
                alt={`${name} thumbnail ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <StarRating />
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${eUSLocale(price)}</p>
          per box of 12
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="sku">SKU: {sku}</div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn-cart"
              onClick={() => onAdd(product, qty)}
            >
              <span>
                <span>Add to Cart</span>
              </span>
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Info ingredients={ingredients} weight={weight} delivery={delivery} />
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = '*[_type == "product"] { slug { current } }';
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { slug: product.slug?.current },
  }));
  return {
    paths: paths.filter(({ params }) => params.slug),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = '*[_type == "product" && slug.current == $slug][0]';
  const product = await client.fetch(query, { slug });

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { products, product },
  };
};
export default ProductDetails;
