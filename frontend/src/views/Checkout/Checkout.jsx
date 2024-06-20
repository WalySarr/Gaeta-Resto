import React from 'react';
import './Checkout.css';
import PlaceOrder from '../../components/PlaceOrder/PlaceOrder';
import AddToCart from '../../components/Cart/AddToCart';

const Checkout = () => {
    return (
        <div className="checkout">
            <section className="checkout-section container">
                <AddToCart/>
                <PlaceOrder />
            </section>
        </div>
    );
};

export default Checkout;
