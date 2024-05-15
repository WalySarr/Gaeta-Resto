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
//get food by id 

const getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ status: 'fail', message: 'Food not found' });
        }
        res.json({
            status: 'success',
            data: food
        });
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


// update food item
// update food item
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const { name, description, price, category } = req.body;

        // Vérifier si l'ID de la nourriture est fourni dans la requête
        if (!foodId) {
            return res.status(400).json({ status: 'fail', message: 'Food ID is missing' });
        }

        // Vérifier si l'élément de nourriture existe dans la base de données
        const foodItem = await foodModel.findById(foodId);
        if (!foodItem) {
            return res.status(404).json({ status: 'fail', message: 'Food Item not found' });
        }

        // Mettre à jour les propriétés de l'élément de nourriture si elles sont fournies dans la requête
        if (name) foodItem.name = name;
        if (description) foodItem.description = description;
        if (price) foodItem.price = price;
        if (category) foodItem.category = category;

        // Vérifier s'il y a une nouvelle image envoyée
        if (req.file) {
            // Supprimer l'ancienne image du serveur si elle existe
            if (foodItem.image) {
                fs.unlink(`uploads/${foodItem.image}`, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });
            }
            // Enregistrer le nouveau nom de fichier de l'image
            foodItem.image = req.file.filename;
        }

        // Sauvegarder les modifications
        await foodItem.save();

        res.json({
            status: 'success',
            data: foodItem,
            message: `Food Item ${foodItem.name} updated successfully`
        });
    } catch (error) {
        console.log("Error at updating a food item", error);
        res.status(500).json({
            status: 'fail',
            message: 'Server Error!'
        });
    }
}


export { addFood, listFood, deleteFoodItem, updateFood, getFoodById };
