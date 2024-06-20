import React from 'react';
import { Link } from 'react-scroll';

export const Banner = () => {
    return (
        <section className="menu-banner">
            <div className="banner-content">
                <h2>Order your favorite food here</h2>
                <p>
                    Choose from a diverse menu featuring a delectable array of dishes crafted with
                    the finest ingredients and culinary expertise. Our mission is to satisfy your
                    cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <Link to="food-display" smooth={true} duration={100}>
                    <button>View Menu</button>
                </Link>
            </div>
        </section>
    );
};
