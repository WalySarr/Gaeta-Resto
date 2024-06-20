/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Swal from 'sweetalert2';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, userId, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 10,
        };
        let response;
        if (token) {
            response = await axios.post(url + '/api/order/place', orderData, {
                headers: { token },
            });
        } else {
            response = await axios.post(url + '/api/order/place', { ...orderData, userId });
        }
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert('Error in placing the order');
            console.log(response.data.error);
        }
    };

    const history = useHistory();
    useEffect(() => {
        if (!token && !userId) {
            history.push('/cart');
        } else if (getTotalCartAmount() === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No order has been placed',
            });
            history.push('/cart');
        }
    }, [token, userId]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <div className="title">Delivery Information</div>
                <div className="multi-fields">
                    <input
                        type="text"
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        placeholder="Last name"
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    placeholder="street"
                    required
                />
                <div className="multi-fields">
                    <input
                        type="text"
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        placeholder="Zip Code"
                    />
                </div>
                <input
                    type="tel"
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    placeholder="phone"
                    required
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()} د.م.</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 10} د.م.</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
                        </div>
                    </div>
                    <button type="submit">Place Order</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
