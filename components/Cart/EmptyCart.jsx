import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';

const EmptyCart = ({ children }) => {
  return (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      <h3>Your shopping bag is empty</h3>
      {children}
    </div>
  );
};

export default EmptyCart;
