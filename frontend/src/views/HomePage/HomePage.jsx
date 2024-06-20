import React from 'react';
import './HomePage.css';
import HomePageLeft from '../../components/HomePageLeft/HomePageLeft';
import HomePageRight from '../../components/HomePageRight/HomePageRight';

const HomePage = () => {
    return (
        <div className="container home-page">
            <div className="home-page__left">
                <HomePageLeft />
            </div>
            <div className="home-page__right">
                <HomePageRight />
            </div>
        </div>
    );
};

export default HomePage;
