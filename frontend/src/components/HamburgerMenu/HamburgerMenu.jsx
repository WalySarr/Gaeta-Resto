import React, { useContext, useState } from 'react';
import './HamburgerMenu.css';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HamburgerMenu = ({ setShowLogin }) => {
    const { token, setToken, username, setUsername } = useContext(StoreContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useHistory();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        toggleSidebar(); // Ferme la barre latérale après avoir cliqué sur Login
    };

    const handleLoginAndToggle = () => {
        setShowLogin(true);
        toggleSidebar();
    };
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken('');
        setUsername('');
        navigate.push('/');
    };
    return (
        <div className="container hamburger__menu">
            <label className="hamburger__nav">
                <input type="checkbox" checked={isOpen} onChange={toggleSidebar} />
                <svg viewBox="0 0 32 32">
                    <path
                        className="line line-top-bottom"
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path className="line" d="M7 16 27 16"></path>
                </svg>
            </label>
            {token ? (
                <>
                    <img
                        src={assets.profile_icon}
                        className="user-pic"
                        alt="user-pic"
                        onClick={toggleMenu}
                    />
                    <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`}>
                        <div className="sub-menu">
                            <div className="user-info">
                                <h3>{username}</h3>
                            </div>
                            <hr />
                            <NavLink to="/myorders" className="sub-menu-link" onClick={closeMenu}>
                                <i className="bi bi-cart4"></i>
                                <p>My Orders</p>
                                <span> {'>'}</span>
                            </NavLink>
                            <NavLink to="/" className="sub-menu-link" onClick={closeMenu}>
                                <img src={assets.logout} alt="" onClick={logOut} />
                                <p onClick={logOut}>Logout</p>
                                <span> {'>'}</span>
                            </NavLink>
                        </div>
                    </div>
                </>
            ) : <></>}

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="hamburger__logo">
                    <NavLink exact to="/" onClick={toggleSidebar}>
                        <img className="img-fluid" src="/images/gaëta.svg" alt="" />
                    </NavLink>
                </div>
                <div className="navigation">
                    <div className="links">
                        <NavLink exact to="/" onClick={toggleSidebar} activeClassName="active">
                            Home
                        </NavLink>
                        <NavLink to="/menu-grid" onClick={toggleSidebar} activeClassName="active">
                            Menu
                        </NavLink>
                        {/* Condition pour afficher le lien "Booking" ou le popup de connexion */}
                        {token ? (
                            <NavLink to="/cart" activeClassName="active" onClick={toggleSidebar}>
                                Cart
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/cart"
                                activeClassName="active"
                                onClick={handleLoginAndToggle}
                            >
                                Cart
                            </NavLink>
                        )}
                        {token ? (
                            <NavLink
                                to="/myorders"
                                activeClassName="active"
                                onClick={toggleSidebar}
                            >
                                Orders
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/myorders"
                                activeClassName="active"
                                onClick={handleLoginAndToggle}
                            >
                                Orders
                            </NavLink>
                        )}
                    </div>
                    <button className="login-button" onClick={handleLoginClick}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;
