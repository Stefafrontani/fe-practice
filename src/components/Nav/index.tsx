import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav: React.FC = () => {
  return (
    <header>
      <nav>
        <ul className="nav">
          <li className="nav__item nav__item--logo">
            <Link to="/">
              <picture>
                <source media="" srcSet=""></source>
                <source media="" srcSet=""></source>
                <img alt="Logo in here" srcSet="" />
              </picture>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/crear-documento">Create Doc</Link>
          </li>
          <li className="nav__item">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
