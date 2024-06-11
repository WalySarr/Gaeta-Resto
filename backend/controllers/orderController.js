import orderModel from '../models/orderModels.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:3000';
    try {
        let userId;
        if (req.body.userId) {
            // Utilisateur connecté
            userId = req.body.userId;
        } else {
            // Utilisateur non connecté : stocker temporairement dans la session
            userId = req.session.userId || null;
        }

        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'MAD',
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'MAD',
                product_data: { name: 'Delivery Charges' },
                unit_amount: 10 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log('Error in placeOrder:', error);
        return res.json({ success: false, message: 'Server Error', error: error });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: `Payment Successful!`,
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: 'Payment Failed',
            });
        }
    } catch (error) {
        console.log('Error in verifyOrder:', error);
        res.json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log('Fetching orders for User ID:', userId);

        if (!userId) {
            return res.json({ success: false, message: 'User ID is required' });
        }

        const orders = await orderModel.find({ userId: userId });
        console.log('Orders found:', orders);

        res.json({ success: true, data: orders });
    } catch (error) {
        console.log('Error in userOrders:', error);
        res.json({ success: false, message: 'Error' });
    }
};

const listOrders = async (req, res) => {
    try {
        // Logique pour répertorier toutes les commandes (peut nécessiter des autorisations spécifiques)
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log('Error in listOrders:', error);
        res.json({ success: false, message: 'Error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.log('Error in updateOrderStatus:', error);
        res.json({ success: false, message: 'Error' });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };
