/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const TownCard = ({ cityName, imageSrc, isOpen, color, isAvailable, link }) => {
    return (
        <NavLink to={link}>
            <div className="left-container__town">
                <div className="card">
                    <img src={imageSrc} alt={`Image of ${cityName}`} />
                    <div className="card__content">
                        <p className="card__title">{cityName}</p>
                        <p className={`card__description ${color}`}>
                            {isAvailable ? (isOpen ? 'Open' : 'Close') : 'Coming Soon'}
                        </p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default TownCard;
