import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { eUSLocale } from '../lib/utils';

const MiniCart = () => {
  const { totalQuantities, cartItems, totalPrice } = useStateContext();

  const handleCheckout = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error('Your cart is empty.');
        return;
      }

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to create Stripe checkout session',
        );
      }

      if (!data.url) {
        throw new Error('Stripe checkout URL is missing.');
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Unable to start checkout.');
    }
  };

  return (
    <div className="mini-cart-container">
      <span className="heading">
        Your Cart contains {totalQuantities} item
        {totalQuantities === 1 ? '' : 's'}
      </span>

      {cartItems.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={50} />
          <p>Your shopping bag is empty</p>
        </div>
      )}

      {cartItems.length >= 1 && (
        <>
          <div className="product-container">
            {cartItems.map((item) => {
              const imageSource = item?.image?.[0] || item?.image;
              const imageUrl = imageSource ? urlFor(imageSource).url() : '';

              return (
                <div className="product" key={item._id}>
                  {imageUrl && (
                    <span>
                      <img
                        src={imageUrl}
                        className="mini-cart-image"
                        alt={item.name}
                      />
                    </span>
                  )}

                  <span className="item-desc">
                    <span>{item.name}</span>

                    <span className="totals">
                      <span>{item.quantity}</span>
                      <span className="multiply">x</span>
                      <span>${eUSLocale(item.price * item.quantity)}</span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="btn-container">
            <button type="button" className="btn" onClick={handleCheckout}>
              Pay with Stripe (${eUSLocale(totalPrice)})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
