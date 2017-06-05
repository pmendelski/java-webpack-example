import React, { PropTypes } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <div className="container">
      { children }
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
