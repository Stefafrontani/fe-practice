import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav: React.FC = () => {
  return (
    <header>
      <nav className="nav">
        <Link className="nav__logo" to="/">
          <picture>
            <source media="" srcSet=""></source>
            <source media="" srcSet=""></source>
            <img alt="Logo in here" srcSet="" />
          </picture>
        </Link>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/crear-documento">Create Doc</Link>
          </li>
          <li className="nav__item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav__item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav__item">
            <Link to="/demo-components">Demo Components</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
