/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import './FoodDisplay.css';
import FoodItem from '../FoodItems/FoodItem';

export const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Grouper les éléments par catégorie
    const groupedItems = food_list.reduce((acc, item) => {
        if (category === 'All' || category === item.category) {
            if (!acc[item.category]) {
                acc[item.category] = [];
            } 
            acc[item.category].push(item);
        }

        return acc;
    }, {});

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {Object.keys(groupedItems).map((cat, index) => (
                    <div key={index}>
                        <h3 className="category-header">{cat}</h3>
                        <div key={index} className="food-grouped" id={cat}>
                            {groupedItems[cat].map((item) => (
                                <FoodItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
