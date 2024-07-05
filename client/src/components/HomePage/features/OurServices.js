import React from 'react';
import deliveryTruck from '../../../assets/svgIcons/delivery-truck.svg';
import customerSupport from '../../../assets/svgIcons/customer-support.svg'
import verified from '../../../assets/svgIcons/verified.svg'



const OurServices = () => {
    return (
        <div className='our-services'>
            <div className='container'>
                <div className='d-flex'>
                    <div className='item'>
                        <div className='image'>
                            <figure className='icon-holder'>
                                <img src={deliveryTruck} />
                            </figure>
                        </div>
                        <div className='description'>
                            <h4>FREE AND FAST DELIVERY</h4>
                            <p>Free Delivery for all orders over $140</p>
                        </div>
                    </div>                    
                    <div className='item'>
                        <div className='image'>
                            <figure className='icon-holder'>
                                <img src={customerSupport}/>
                            </figure>
                        </div>
                        <div className='description'>
                            <h4>24/7 CUSTOMER SERVICE</h4>
                            <p>Friendly 24/7 customer support</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <figure className='icon-holder'>
                                <img src={verified}/>
                            </figure>
                        </div>
                        <div className='description'>
                            <h4>MONEY BACK GUARNTEE</h4>
                            <p>We return money within 30 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OurServices;