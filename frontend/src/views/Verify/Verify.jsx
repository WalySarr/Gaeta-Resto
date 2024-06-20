import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Verify = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const history = useHistory();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (success && orderId) {
                    const response = await axios.post(`/api/order/verify`, { success, orderId });

                    if (response.data.success) {
                        history.push('/myorders');
                    } else {
                        history.push('/');
                    }
                } else {
                    // Handle verification for non-logged-in users
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
                    console.log('Order verified:', orderId);
                    history.push('/order-confirmed'); // Redirect to order confirmation page for non-logged-in users
                }
            } catch (error) {
                console.error('Error verifying order:', error);
                history.push('/'); // Redirect to home page in case of an error
            }
        };

        verifyPayment();
    }, [success, orderId, history]);

    return <Loader />;
};

export default Verify;
