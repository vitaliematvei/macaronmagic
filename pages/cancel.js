import React from 'react';
import Link from 'next/link';
import { BsBagXFill } from 'react-icons/bs';

const Cancel = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p
          className="icon"
          style={{
            color: 'var(--coral)',
            fontSize: '40px',
            margin: '0 0 16px',
          }}
        >
          <BsBagXFill />
        </p>
        <h2>Order Cancelled</h2>
        <p className="email-msg" style={{ margin: '8px 0 16px' }}>
          Forgot to add something to your cart?
        </p>
        <p
          className="description"
          style={{ margin: '16px 0 30px', fontSize: '15px' }}
        >
          No payment was processed. If you have any questions or need help,
          please email{' '}
          <a
            className="email"
            href="mailto:contact@macaronmagic.com"
            style={{ color: 'var(--coral)', fontWeight: 600 }}
          >
            contact@macaronmagic.com
          </a>
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <Link href="/shop" style={{ width: '100%', maxWidth: '300px' }}>
            <button type="button" className="btn" style={{ width: '100%' }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
