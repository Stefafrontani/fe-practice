import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/crear-documento">Create Doc</Link>
            </li>
        </ul>
    );
}

export default Nav;