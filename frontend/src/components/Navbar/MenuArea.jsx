import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuArea.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MenuArea = ({ setShowLogin }) => {
    const { token, setToken, username, setUsername } = useContext(StoreContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useHistory();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken('');
        setUsername('');
        navigate.push('/');
    };

    return (
        <>
            <HamburgerMenu setShowLogin={setShowLogin} />
            <div className="container menu-area-section">
                <div className="menu-are__logo">
                    <NavLink to="/">
                        <img className="img-fluid" src="/images/gaëta.svg" alt="" />
                    </NavLink>
                </div>
                <div className="menu-are__links">
                    <NavLink exact to="/" activeClassName="active">
                        Home
                    </NavLink>
                    <NavLink to="/menu-grid" activeClassName="active">
                        Menu
                    </NavLink>
                    <NavLink to="/cart" activeClassName="active">
                        Cart
                    </NavLink>
                    <NavLink to="/myorders" activeClassName="active">
                        Orders
                    </NavLink>
                </div>
                <div className="menu-are__btn">
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
                                    <NavLink
                                        to="/myorders"
                                        className="sub-menu-link"
                                        onClick={closeMenu}
                                    >
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
                    ) : (
                        <button onClick={setShowLogin}>
                            Login
                            <div className="arrow-wrapper">
                                <div className="arrow"></div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default MenuArea;
