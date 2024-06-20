import React, { useContext } from 'react';
import './AddToCart.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const AddToCart = () => {
    const { cartItems, food_list, removeFromCart, addToCart, url, totalUniqueItems } =
        useContext(StoreContext);

    return (
        <div className="cart-section">
            <div className="cart-header">
                <h2>Yummy Bag</h2>
                <span>
                    <b>
                        {totalUniqueItems} item{totalUniqueItems > 1 ? 's' : ''}
                    </b>{' '}
                    in your bag.
                </span>
            </div>
            <div className="cart-body">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total Price</p>
                    </div>
                    {/* eslint-disable-next-line array-callback-return */}
                    {food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <>
                                    <div className="cart-item-content mb-3" key={index}>
                                        <div className="cart-item-info">
                                            <div className="image">
                                                <img src={url + '/images/' + item.image} alt="" />
                                            </div>
                                            <div className="info">
                                                <p className="category-name">{item.category}</p>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                        <span className="price">{item.price}.00 د.م.</span>
                                        <div className="food-item-counter position-relative">
                                            <img
                                                src={assets.remove_icon_red}
                                                alt=""
                                                onClick={() => removeFromCart(item._id)}
                                            />
                                            <p>{cartItems[item._id]}</p>
                                            <img
                                                src={assets.add_icon_green}
                                                alt=""
                                                onClick={() => addToCart(item._id)}
                                            />
                                        </div>
                                        <span className="total-price">
                                            {item.price * cartItems[item._id]}.00 د.م.
                                        </span>
                                    </div>
                                    <hr />
                                </>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
