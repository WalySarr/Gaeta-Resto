import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token, userId } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All Orders'); // Valeur par défaut

    const fetchOrders = async () => {
        let response;
        if (token) {
            response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
        } else {
            response = await axios.post(url + '/api/order/userorders', { userId });
        }
        setData(response.data.data);
    };

    useEffect(() => {
        if (token || userId) {
            fetchOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userId]);

    // Fonction de tri des commandes en fonction du statut sélectionné
    let filteredOrders = [];
    if (selectedStatus === 'All Orders') {
        filteredOrders = data.slice(0).reverse(); // Inverser l'ordre des commandes
    } else {
        filteredOrders = data
            .filter((order) => order.status === selectedStatus)
            .slice(0)
            .reverse();
    }

    return (
        <div className="container">
            <div className="my-orders">
                <div className="order-header">
                    <h2>My Orders</h2>
                    <select
                        className="form-select"
                        aria-label="FOOD TRACKING"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        value={selectedStatus}
                    >
                        <option value="All Orders">All Orders</option>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivery">Delivery</option>
                    </select>
                </div>
                <div className="container">
                    {filteredOrders.map((order, index) => (
                        <div
                            key={index}
                            className={`my-orders-order ${
                                order.status === 'Food Processing' ? 'food-processing' : ''
                            }`}
                        >
                            <img src={assets.parcel_icon} alt="icon" />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + 'x' + item.quantity;
                                    } else {
                                        return item.name + 'x' + item.quantity + ', ';
                                    }
                                })}
                            </p>
                            <p>MAD {order.amount}.00</p>
                            <p>{order.items.length}</p>
                            <p>
                                <span>&#x25cf; </span>
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
