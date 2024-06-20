import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../context/StoreContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const { totalUniqueItems } = useContext(StoreContext);

    return (
        <>
            <div className="food-item ">
                <div className="food-item-img-container" id={id}>
                    <img src={url + '/images/' + image} alt={name} className="food-item-image" />
                    {!cartItems[id] ? (
                        <img
                            className="add"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white}
                            alt=""
                        />
                    ) : (
                        <div className="food-item-counter">
                            <img
                                onClick={() => removeFromCart(id)}
                                src={assets.remove_icon_red}
                                alt=""
                            />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                    )}
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        {/* <img src={assets.rating_starts} alt="" /> */}
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <div className="food-item-price">{price}.00 د.م.</div>
                </div>
            </div>

            <div className="bucket">
                <Link to="/cart" className="cart-icon order-lg-2">
                    <i className="bi bi-basket ">
                        <span>{totalUniqueItems}</span>
                    </i>
                </Link>
            </div>
        </>
    );
};

export default FoodItem;
