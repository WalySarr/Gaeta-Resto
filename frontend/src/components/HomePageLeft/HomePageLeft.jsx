import React, { useEffect, useState } from 'react';
import './HomePageLeft.css';
import TownCard from '../TownCard/TownCard';

const HomePageLeft = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        const openingTime = 9;
        const closingTime = 21;
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour >= openingTime && currentHour < closingTime) {
            setIsOpen(true);
            setColor('text-success');
        } else {
            setIsOpen(false);
            setColor('text-danger');
        }
    }, []);

    return (
        <div>
            <div className=" container left-container">
                <div className="left-container__header">
                    <span className="fresh">Fresh Cuisine</span>
                    <p>
                        <span className="with">with</span>
                        <span className="great">Great Flavor</span>
                    </p>
                <div className="left-container__img">
                    <img src="/images/HomePage/curve.svg" alt="" />
                </div>
                </div>
                <div className="left-container__text">
                    Experience the delight of fresh cuisine that tantalizes your taste buds with
                    every bite. Our dishes are crafted from the finest ingredients, ensuring not
                    only a healthy meal but also an unforgettable dining experience. From farm to
                    table, we prioritize quality and taste, delivering a culinary experience that
                    will leave you craving more. Discover the perfect blend of freshness and flavor
                    with every dish we serve.
                </div>
                <div className="left-container__search">
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Find Great Dishes"
                        readOnly
                    />
                    <button className="search__button">
                        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="town">
                    <TownCard
                        cityName="Gaëta Casablanca"
                        imageSrc="/images/HomePage/casablanca.jpg"
                        isOpen={isOpen}
                        color={color}
                        isAvailable={true}
                        link="/menu-grid"
                    />
                    <TownCard
                        cityName="Gaëta Tanger"
                        imageSrc="/images/HomePage/tanger.jpg"
                        isOpen={isOpen}
                        color={color}
                        isAvailable={false} // Tanger est bientôt disponible
                        link="/"
                    />
                    <TownCard
                        cityName="Gaëta Rabat"
                        imageSrc="/images/HomePage/rabat.jpg"
                        isOpen={isOpen}
                        color={color}
                        isAvailable={false} // Rabat est disponible
                        link="/"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePageLeft;
