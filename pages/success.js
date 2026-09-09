import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon" style={{ color: 'var(--coral)', fontSize: '40px', margin: '0 0 16px' }}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg" style={{ margin: '8px 0 16px' }}>
          Check your email inbox for the receipt.
        </p>
        <p className="description" style={{ margin: '16px 0 30px', fontSize: '15px' }}>
          If you have any questions, please email{' '}
          <a
            className="email"
            href="mailto:contact@macaronmagic.com"
            style={{ color: 'var(--coral)', fontWeight: 600 }}
          >
            contact@macaronmagic.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{ width: '100%', maxWidth: '300px' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
