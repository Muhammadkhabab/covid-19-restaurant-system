import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
} from 'reactstrap';
import '../../styles/NavigationBar.scss';
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER_CUSTOMER,
  ROUTE_DASHBOARD_RESTAURANT,
  ROUTE_DASHBOARD_USER,
  ROUTE_RESTAURANTS,
  ROUTE_ACCOUNT,
} from '../../constants/routes';

const NavigationBar = ({
  icon,
  title,
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const privateLinks = (
    <Fragment>
      <NavItem>
        <Link to={ROUTE_ACCOUNT} className='nav-link'>
          <i className='fas fa-user mr-1' />
          Account
        </Link>
      </NavItem>
      <NavItem>
        <Link to={ROUTE_RESTAURANTS} className='nav-link'>
          <i className='fas fa-store mr-1' />
          Restaurants
        </Link>
      </NavItem>
      {user && (user.is_admin || user.is_staff) ? (
        <NavItem>
          <Link to={ROUTE_DASHBOARD_RESTAURANT} className='nav-link'>
            <i className='fas fa-chart-line mr-1' />
            Dashboard
          </Link>
        </NavItem>
      ) : (
        <NavItem>
          <Link to={ROUTE_DASHBOARD_USER} className='nav-link'>
            <i className='fas fa-shopping-cart mr-1' />
            Dashboard
          </Link>
        </NavItem>
      )}
      <NavItem>
        <Link to='#!' className='nav-link' onClick={logout}>
          <i className='fas fa-sign-out-alt mr-1' />
          Logout
        </Link>
      </NavItem>
    </Fragment>
  );

  const publicLinks = (
    <Fragment>
      <NavItem>
        <Link to={ROUTE_RESTAURANTS} className='nav-link'>
          <i className='fas fa-store mr-1' />
          Restaurants
        </Link>
      </NavItem>
      <NavItem>
        <Link to={ROUTE_REGISTER_CUSTOMER} className='nav-link'>
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to={ROUTE_LOGIN} className='nav-link'>
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand='md' id='navbar'>
      <Container>
        <NavbarBrand tag={Link} to={ROUTE_RESTAURANTS}>
          <i className={`${icon} mr-1`} /> {title}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {!loading && (
              <Fragment>
                {isAuthenticated ? privateLinks : publicLinks}
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.defaultProps = {
  title: 'Safe Dining',
  icon: 'fas fa-utensils',
};

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
