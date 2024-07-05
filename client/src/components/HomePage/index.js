import React, { useEffect } from 'react';
import Banner from './features/Banner';
import ProductsListing from './features/ProductsListing';
import Categories from './features/Categories';
import OurServices from './features/OurServices';


const Home = () => {    

    return (
        <div className='main-content'>
            <Banner />
            <ProductsListing />
            <Categories />
            <OurServices />
        </div>
    )
};

export default Home;