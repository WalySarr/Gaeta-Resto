import userModel from '../models/userModel.js';

// Add Items to user cart
const addToCart = async (req, res) => {
    try {
        let userData;
        if (req.isAuthenticated) {
            // Utilisateur connecté
            userData = await userModel.findOne({ _id: req.body.userId });

        } else {
            // Utilisateur non connecté
            userData = req.session.cart || { cartData: {} };

        }
        let cartData = userData.cartData || {};
        // Votre logique d'ajout au panier ici
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        if (req.isAuthenticated) {
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        } else {
            req.session.cart = { cartData };
        }
        res.json({ success: true, message: 'Added To Cart' });
    } catch (error) {
        console.log('Error in adding item to the cart', error);
        res.json({ success: false, message: 'Error' });
    }
};

// Remove Items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData;
        if (req.isAuthenticated) {
            // Utilisateur connecté
            userData = await userModel.findById(req.body.userId);
        } else {
            // Utilisateur non connecté
            userData = req.session.cart || { cartData: {} };
        }
        let cartData = userData.cartData || {};
        // Votre logique de suppression du panier ici
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        if (req.isAuthenticated) {
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        } else {
            req.session.cart = { cartData };
        }
        res.json({ success: true, message: 'Remove From Cart Successfully' });
    } catch (error) {
        console.log('Error in removing Item from the cart', error);
        res.json({ success: false, message: 'Error In Removing The Item' });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData;
        if (req.isAuthenticated) {
            // Utilisateur connecté
            userData = await userModel.findById(req.body.userId);
        } else {
            // Utilisateur non connecté
            userData = req.session.cart || { cartData: {} };
        }
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log('Error in getting User Cart Data ', error);
        res.json({ success: false, message: 'Error In Fetching Your Cart' });
    }
};

// Clear user cart
const clearCart = async (req, res) => {
    try {
        if (req.isAuthenticated) {
            // Utilisateur connecté
            // await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        } else {
            // Utilisateur non connecté
            req.session.cart = { cartData: {} };
        }
        res.json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        console.log('Error in clearing the cart', error);
        res.json({ success: false, message: 'Error in clearing the cart' });
    }
};

export { addToCart, removeFromCart, getCart, clearCart };
