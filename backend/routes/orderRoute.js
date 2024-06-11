import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    listOrders,
    placeOrder,
    updateOrderStatus,
    userOrders,
    verifyOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Routes de commandes avec middleware d'authentification
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateOrderStatus);

export default orderRouter;
