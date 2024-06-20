import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import MapComponent from '../Map/Map';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');

    const { getTotalCartAmount, token, userId, food_list, cartItems, url, setCartItems } =
        useContext(StoreContext);
    const [data, setData] = useState({
        firstName: '',
        address: '',
        zipCode: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!data.firstName.trim()) {
            formErrors.firstName = 'Le nom est requis.';
        }
        // Validation des autres champs...
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        if (getTotalCartAmount() <= 10) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        const updatedData = { ...data, address: address || data.address, zipCode: zipCode || data.zipCode };
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: updatedData,
            items: orderItems,
            amount: getTotalCartAmount() + 10,
            paymentMethod: 'cash_on_delivery', // Added payment method
        };

        if (token) {
            orderData = { ...orderData, userId: token };
        } else {
            orderData = { ...orderData, userId };
        }

        try {
            let response = await axios.post(url + '/api/order/place', orderData, {
                headers: { token },
            });
            if (response.data.success) {
                // Clear the cart after successful order placement
                await axios.post(
                    url + '/api/cart/clear',
                    { userId: token ? token : userId },
                    {
                        headers: { token },
                    }
                );
                // Update local cart state after successful order placement
                setCartItems({});
                Swal.fire({
                    icon: 'success',
                    title: 'Commande passée',
                    text: 'Votre commande a été passée avec succès et sera payée à la livraison.',
                });
                history.push('/myorders'); // Redirect to an order confirmation page
            } else {
                alert('Erreur lors de la passation de la commande');
                console.log('Order Error:', response.data.error);
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const handleClick = () => {
        if (!token && !userId) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez vous connecter pour continuer',
            });
        } else if (getTotalCartAmount() === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Aucune commande n'a été passée",
            });
            history.push('/cart');
        }
    };

    const handleUpdateLocation = (position) => {
        getGeocode(position);
    };

    const getGeocode = async (latlng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            const results = response.data.results;

            if (results.length > 0) {
                const address = results[0].formatted_address;
                setAddress(address);
                const postalCode = results[0].address_components.find((component) =>
                    component.types.includes('postal_code')
                );
                if (postalCode) {
                    setZipCode(postalCode.long_name);
                }
            }
        } catch (error) {
            console.error('Error fetching geocode: ', error);
        }
    };

    return (
        <form className="place-order-section" onSubmit={placeOrder}>
            <div className="place-order-section__header">Frais de livraison calculés</div>
            <div className="place-order-section__info">
                <input
                    type="text"
                    placeholder="Nom"
                    className="name"
                    name="firstName"
                    id="firstname"
                    onChange={onChangeHandler}
                    value={data.firstName}
                />
                {errors.firstName && <div className="error">{errors.firstName}</div>}
                <input
                    type="text"
                    placeholder="Téléphone"
                    className="name"
                    name="phone"
                    id="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    autoComplete="true"
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
                <div className="inputs-flex">
                    <input
                        type="text"
                        placeholder="Adresse"
                        className="address"
                        name="address"
                        id="address"
                        onChange={onChangeHandler}
                        value={address || data.address}
                        autoComplete="false"
                    />
                    {errors.address && <div className="error">{errors.address}</div>}
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Code Postal"
                        className="zip-code"
                        name="zipCode"
                        id="zipcode"
                        value={zipCode || data.zipCode}
                    />
                    {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                </div>
                <MapComponent
                    setAddress={setAddress}
                    setZipCode={setZipCode}
                    onUpdateLocation={handleUpdateLocation}
                />
            </div>
            <hr />
            <div className="coupon-code">
                <div className="place-order-section__header">Promo Code</div>
                <div className="coupon-detail mb-3">
                    Place two or three orders with us and earn an exclusive discount code for your
                    next purchase. It's our way of thanking you for your loyalty. Enjoy your meal!
                </div>
                <input
                    type="text"
                    placeholder="Code Promo"
                    id="coupon"
                    className="coupon-code w-100"
                />
                <button className="palce-order-btn my-3 w-100">Apply</button>
            </div>
            <div className="cart-purchase">
                <div className="place-order-section__header mb-1">Cart Total</div>
                <div className="cart-payment">
                    <p>Cart Subtotal</p>
                    <span>{getTotalCartAmount()}.00 د.م.</span>
                </div>
                <div className="cart-payment">
                    <p>Frais de Livraison</p>
                    <span>{getTotalCartAmount() === 0 ? 0 : 10}.00 د.م.</span>
                </div>
                <div className="cart-payment">
                    <p>Discount</p>
                    <span>0%</span>
                </div>
                <div className="cart-payment">
                    <p>Total du Panier</p>
                    <span>
                        {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}.00 د.م.
                    </span>
                </div>
                <button className="palce-order-btn my-3 w-100" type="submit" onClick={handleClick}>
                    Proceed
                </button>
            </div>
        </form>
    );
};

export default PlaceOrder;
