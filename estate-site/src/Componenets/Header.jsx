import React from 'react';
import './Layout.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <h1>Nexus<span>Dream Homes</span></h1>
        </div>
        <nav className="nav-links">
          <a href="/" className="active">Search</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;