import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';
import Pagination from '../Pagination/Pagination.jsx';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Nombre d'éléments par page

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
            await fetchAllOrders();
        }
    };

    useEffect(() => {
        fetchAllOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    // Logique de pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="order add">
            <div className="header d-flex justify-content-between align-items-center">
                <h3>Order Page</h3>
                <Pagination
                    ordersPerPage={ordersPerPage}
                    totalOrders={orders.length}
                    paginate={paginate}
                    currentPage={currentPage} // Pass the currentPage to Pagination component
                />
            </div>
            <div className="order-list">
                {currentOrders.map((order, index) => (
                    <div
                        className={`order-item ${index === activeIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleItemClick(index)}
                    >
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
                            <p className="order-item-name">{order.address.firstName}</p>
                            <div className="order-item-address">
                                <p>{order.address.address + ', '}</p>
                                <p>{order.date}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>درهم {order.amount} (MAD)</p>
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
