import { response } from "express";
import userModel from "../models/userModel.js";

// add Items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Added To Cart" })
    } catch (error) {
        console.log("Error in adding item to the cart", error);
        res.json({ success: false, message: "Error" })
    }
}

// remove Items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Remove From Cart Successfully" })
    } catch (error) {
        console.log('Error in removing Item from the cart', error)
        res.json({ success: false, message: "Error In Removing The Item" })
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        res.json({ success: true, cartData })

    } catch (error) {
        console.log('Error in getting User Cart Data ', error)
        res.json({ success: false, message: "Error In Fetching Your Cart" })
    }
}

export { addToCart, removeFromCart, getCart }