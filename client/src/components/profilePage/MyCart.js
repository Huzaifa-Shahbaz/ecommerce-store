import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../../redux/slices/cartSlice';
import EmptySideMenu from '../../global/customComponents/EmptySideMenu';
import emptyCartIcon from '../../assets/icons/empty-cart.png';



const MyCart = ({index}) => {
    
    const tabTitle = 'My Cart'
    const cartItems = useSelector(cartItemsSelector);


    return (
        <div 
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <div className='cart-items'>
                {cartItems.length === 0 ? (
                    <EmptySideMenu
                        icon={emptyCartIcon}
                        title='Cart is empty !'
                        text='Looks like you dont added any product to cart'
                    />
                ) : (
                    <div>cart items : ({cartItems?.length})</div>
                )}
            </div>
        </div>
    )
};

export default MyCart;