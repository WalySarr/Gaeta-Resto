/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Update.css';

const Update = ({ url }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const foodId = searchParams.get('id'); // Récupérer l'ID de l'aliment à partir de l'URL
    const history = useNavigate();
    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null, // Ajoutez une clé pour stocker l'image
    });

    // Récupérer les données de l'aliment à mettre à jour
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await axios.get(`${url}/api/food/${foodId}`);
                const food = response.data.data;
                setFoodData({
                    name: food.name,
                    description: food.description,
                    price: food.price,
                    category: food.category,
                    image: food.image, // Assurez-vous de stocker l'image
                });
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchFood();
    }, [foodId, url]);

    // Gestionnaire de changement pour les champs de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    // Gestionnaire de changement pour les fichiers
    const handleFileChange = (e) => {
        setFoodData({ ...foodData, image: e.target.files[0] });
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', foodData.name);
            formData.append('description', foodData.description);
            formData.append('price', foodData.price);
            formData.append('category', foodData.category);
            if (foodData.image) {
                formData.append('image', foodData.image);
            }

            // Log les données avant l'envoi
            console.log('FormData entries:', [...formData.entries()]);

            const response = await axios.put(`${url}/api/food/update/${foodId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                toast.success(response.data.message);
                history('/list'); // Rediriger vers la liste après la mise à jour
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating food data:', error);
            toast.error('Error updating food data');
        }
    };

    useEffect(() => {
        console.log('foodData changed:', foodData);
    }, [foodData]);

    return (
        <div className="add">
            <form className="flex-col update" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img
                            src={
                                foodData.image
                                    ? `${url}/images/${foodData.image}`
                                    : assets.upload_area
                            }
                            alt=""
                        />
                    </label>
                    <input type="file" id="image" onChange={handleFileChange} hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Type here"
                        value={foodData.name || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Description</p>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Write something about your product..."
                        value={foodData.description || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select
                            name="category"
                            value={foodData.category || ''}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Carpaccio">Carpaccio</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Panozzo">Panozzo</option>
                            <option value="Gnocci">Gnocci</option>
                            <option value="Caldi">Caldi</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Ravioli">Ravioli</option>
                            <option value="Poissons">Poissons</option>
                            <option value="Piatti">Piatti</option>
                            <option value="Risotto">Risotto</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            type="number"
                            name="price"
                            placeholder="20dh"
                            value={foodData.price || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default Update;
