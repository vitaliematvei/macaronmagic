import React, { useState } from 'react';
import Link from 'next/link';
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShopping,
} from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './index';

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="navbar-container">
      <div className="company-name">
        <Link href="/">Mangez Macaron</Link>
        <div className="nav-controls">
          <div
            id="primary-navigation"
            className={`navbar${isMobileMenuOpen ? ' navbar-open' : ''}`}
          >
            <Link href="/" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/about" onClick={closeMobileMenu}>
              About
            </Link>
            <Link href="/shop" onClick={closeMobileMenu}>
              Shop
            </Link>
            <Link href="/contact" onClick={closeMobileMenu}>
              Contact
            </Link>
            <button
              type="button"
              className="cart-icon"
              onClick={() => {
                closeMobileMenu();
                setShowCart(true);
              }}
              aria-label={`Open cart with ${totalQuantities} items`}
            >
              <AiOutlineShopping />
              <span className="cart-item-qty">{totalQuantities}</span>
            </button>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-controls="primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
