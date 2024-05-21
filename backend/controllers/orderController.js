import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user Order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:3000'
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'MAD',
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "MAD",
                product_data: { name: "Delivery Charges" },
                unit_amount: 10 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log('Error in create-charge', error);
        return res.json({ success: false, message: "Server Error", error: error });
    }
}


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({
                success: true,
                message: `Payment Successful!`
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// User Order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log("User Orders Error :", error)
        res.json({ success: false, message: "erreur" })
    }
}

// Listing Orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log('List Orders Error', error)
        res.json({ success: false, message: "erreur" })

    }
}

// api for updating status
const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status upadated sucessfully" })
    } catch (error) {
        console.log("updateOrderStatus Error :", error)
        res.json({ success: false, message: "erreur" })
    }
}
export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus }