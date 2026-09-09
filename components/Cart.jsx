import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { eUSLocale } from '../lib/utils';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to create Stripe checkout session');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('Stripe checkout URL is missing');
      }

      window.location.assign(url);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Unable to start checkout');
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/" onClick={() => setShowCart(false)}>
              <button type="button" className="btn">
                Continue Shopping
              </button>
            </Link>
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
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <TiDeleteOutline />
                    </button>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        className="cart-product-image"
                        alt={item.name}
                      />
                    )}
                    <div className="item-desc">
                      <div>
                        <span>{item.name}</span>
                        <span>
                          {item.quantity} @ ${eUSLocale(item.price)}
                        </span>
                      </div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h4>${eUSLocale(totalPrice)}</h4>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="btn"
                  onClick={handleCheckout}
                >
                  Pay with Stripe
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: 'transparent',
                    color: 'var(--ink)',
                    borderColor: 'var(--line)',
                  }}
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

