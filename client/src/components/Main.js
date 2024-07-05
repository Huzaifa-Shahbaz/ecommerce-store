import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './HomePage';
import DetailPage from './detailPage/DetailPage';
import CartPage from './cartPage/Cartpage';
import SearchResults from './SearchResults';
import CheckOut from './checkoutPage/CheckOut';
import Login from './registration/Login';
import Signup from './registration/Signup';
import ProfilePage from './profilePage/ProfilePage';
import Header from './Header';
import FavouritesList from '../global/customComponents/FavouritesList';
import Footer from './Footer';
import Store from './StorePage/Store';
import OrderTrackingPage from './OrderTrackingPage';



const Main = () => {
    
    return (
        <>
            <FavouritesList />
            <Header />
            <div className='main-content'>
                <Routes>                    
                    <Route path='login' element={<Login />} />
                    <Route path='sign-up' element={<Signup />} />
                    <Route path='profile-page' element={<ProfilePage />} />
                    <Route path='/' element={<Home />} />
                    <Route path='store-page' element={<Store />} />
                    <Route path='details-page' element={<DetailPage />} />
                    <Route path='cart-page' element={<CartPage />} />
                    <Route path='search-results' element={<SearchResults />} />
                    <Route path='check-out' element={<CheckOut />}  />
                    <Route path='order-tracking' element={<OrderTrackingPage />}  />
                </Routes>
            </div>
            <Footer />
        </>
    )
};

export default Main;