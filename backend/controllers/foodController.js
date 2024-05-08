import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food Item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({
            status: 'success',
            data: food,
            message: "food added successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'fail',
            message: error
        })
    }
}
// all list food

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            status: 'success',
            data: foods
        })
    } catch (error) {
        console.log('Error : ', error);
        res.status(400).json({
            status: 'fail',
            message: "Error in fetching the data"
        });
    }
}

// remove food item
const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.body.id)
        if (!foodItem) return res.status(400).json({ status: 'fail', message: 'No Food Item found' })
        fs.unlink(`uploads/${foodItem.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({
            status: 'success',
            data: null,
            message: `Food Item ${foodItem.name} is deleted successfully`
        })

    } catch (error) {
        console.log("Error at deleting a food item", error);
        res.status(500).json({
            status: 'fail',
            message: 'Server Error!'
        })
    }
}








export { addFood, listFood, deleteFoodItem }