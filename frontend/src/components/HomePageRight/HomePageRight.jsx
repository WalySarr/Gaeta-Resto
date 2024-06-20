import React from 'react';
import './HomePageRight.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const HomePageRight = () => {
    const handleRatingChange = (event) => {
        console.log(`Rating selected: ${event.target.value}`);
    };

    return (
        <div className="right-container">
            <div className="right-container__header">
                <img src="/images/HomePage/brunch.avif" alt="" />
                <div className="left-container__search">
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Breakfast Food"
                        readOnly
                    />
                    <i className="bi bi-search fs-3"></i>
                </div>
                <h3 className="right-container__text">
                    ENJOY HEALTHY EATS - STAY CASUAL AND RELAXED!
                </h3>
            </div>
            <div className="parking">
                <h3>+ 15 FREE PARKING SPOTS</h3>
                <div className="rating">
                    <input
                        type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        checked
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="star5" title="text"></label>
                    <input
                        type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="star4" title="text"></label>
                    <input
                        type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="star3" title="text"></label>
                    <input
                        type="radio"
                        id="star2"
                        name="rate"
                        value="2"
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="star2" title="text"></label>
                    <input
                        type="radio"
                        id="star1"
                        name="rate"
                        value="1"
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="star1" title="text"></label>
                </div>
            </div>
            <div className="food-summary">
                <NavLink to="/menu-grid">
                    <div className="food-summary-pasticio food-item-name-rating">
                        <img src="/images/HomePage/salad.jpg" alt="" />
                        <p className="food-summary-title">Salad Greco</p>
                    </div>
                </NavLink>
                <NavLink to="/menu-grid">
                    <div className="food-summary-pasticio food-item-name-rating">
                        <img src="/images/HomePage/verdura.jpg" alt="" />
                        <p className="food-summary-title">Di Verdura</p>
                    </div>
                </NavLink>
                <NavLink to="/menu-grid">
                    <div className="food-summary-pasticio food-item-name-rating">
                        <img src="/images/HomePage/forno.jpg" alt="" />
                        <p className="food-summary-title">Pollo Al Forno</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default HomePageRight;
