import React, { useState } from 'react';
import { Banner } from '../components/banner';
import { ExploreMenu } from '../components/subcomponents/ExploreMenu/ExploreMenu';
import { FoodDisplay } from '../components/subcomponents/FoodDisplay/foodDisplay';
import { SpecialFooter } from '../components/special_footer';

export const MenuDetail = () => {
    const [category, setCategory] = useState('All');
    return (
        <>
            <section className="menu-detail">
                <Banner />
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} setCategory={setCategory} />
            </section>
            <SpecialFooter />
        </>
    );
};
