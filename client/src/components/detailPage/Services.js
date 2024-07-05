import React from 'react';
import deliveryIcon from '../../assets/icons/delivery.png';
import returnIcon from '../../assets/icons/return.png';



const Services = () => {
    return (
        <ul className='options'>
            <li>
                <div className='icon-holder'>
                    <img src={deliveryIcon} />
                </div>
                <div className='content'>
                    <h4>Free Delivery</h4>
                    <p>Enter your postal code for Delivery Availability.</p>
                </div>
            </li>
            <li>
                <div className='icon-holder'>
                    <img src={returnIcon} />
                </div>
                <div className='content'>
                    <h4>Return Delivery</h4>
                    <p>Free 30 Days Delivery Returns.</p>
                </div>
            </li>
        </ul>
    )
};

export default Services;