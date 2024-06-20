import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(''); // Ajoutez cet état pour l'userId
    const [food_list, setFoodList] = useState([]);
    const [totalUniqueItems, setTotalUniqueItems] = useState(0);
    const url = 'http://localhost:4000';

    const generateUserId = () => {
        let existingUserId = Cookies.get('user_id');
        if (!existingUserId) {
            existingUserId = `guest_${Math.random().toString(36).substr(2, 9)}`;
            Cookies.set('user_id', existingUserId, { expires: 365 });
        }
        setUserId(existingUserId);
    };

    const addToCart = async (itemId, userId) => {
        console.log('userId in addToCart:', userId); // Ajoutez un console.log pour userId
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        await axios.post(url + '/api/cart/add', { itemId, userId }, { headers: { token } });
    };

    const removeFromCart = async (itemId, userId) => {
        console.log('userId in removeFromCart:', userId); // Ajoutez un console.log pour userId
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        await axios.post(url + '/api/cart/remove', { itemId, userId }, { headers: { token } });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                setUsername(localStorage.getItem('username'));
                await loadCartData(localStorage.getItem('token'));
            } else {
                generateUserId();
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        const uniqueItemsCount = Object.keys(cartItems).filter((key) => cartItems[key] > 0).length;
        setTotalUniqueItems(uniqueItemsCount);
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        totalUniqueItems,
        url,
        token,
        setToken,
        username,
        setUsername,
        userId, // Ajoutez userId au contexte
        setUserId, // Ajoutez setUserId au contexte
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
