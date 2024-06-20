import React, { useRef, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { menu_list } from '../../../assets/assets';
import './ExploreMenu.css';

export const ExploreMenu = ({ category, setCategory }) => {
    const exploreMenuRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const exploreMenu = exploreMenuRef.current;
            const exploreMenuRect = exploreMenu.getBoundingClientRect();

            // Vérifier si l'élément est sticky
            if (exploreMenuRect.top <= 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`explore-menu ${isSticky ? 'sticky' : ''}`}
            id="explore-menu"
            ref={exploreMenuRef}
        >
            <h1>Explorer our menu</h1>
            <p className="explore-menu-text">
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to
                satisfy your cravings and elevate your dining experience, one delicious meal at a
                time.
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() =>
                                setCategory((prev) =>
                                    prev === item.menu_name ? 'All' : item.menu_name
                                )
                            }
                            key={index}
                            className="explore-menu-list-item"
                            id={item.menu_name}
                        >
                            <LazyLoad
                                height={200}
                                offset={100}
                                placeholder={
                                    <img src="https://placehold.co/400x400.png" alt="placeholder" />
                                }
                            >
                                <img
                                    className={category === item.menu_name ? 'active' : ''}
                                    src={item.menu_image}
                                    alt={item.menu_name}
                                />
                            </LazyLoad>
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};
