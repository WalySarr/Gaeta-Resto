/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Orders.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets.js';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + '/api/order/list');
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            toast.error('Error');
        }
    };

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + '/api/order/status', {
            orderId,
            status: event.target.value,
        });
        if (response.data.success) {
            await fetchAllOrders()
        }
    };

    useEffect(() => {
        fetchAllOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div className="order-item" key={index}>
                        <img src={assets.parcel_icon} alt="icon" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + 'x' + item.quantity;
                                    } else {
                                        return item.name + 'x' + item.quantity + ', ';
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName + ' ' + order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street + ', '}</p>
                                <p>
                                    {order.address.city +
                                        ', ' +
                                        order.address.state +
                                        ', ' +
                                        order.address.city +
                                        ', ' +
                                        order.address.zipcode +
                                        ', '}
                                </p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>درهم {order.amount} (MAD) </p>
                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="form-select"
                            aria-label="FOOD TRACKING"
                        >
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivery">Delivery</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
