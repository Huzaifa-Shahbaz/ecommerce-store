import React from 'react';
import PrimaryButton from '../../global/customComponents/PrimaryButton'



const OrderSummary = ({total, navigatePage}) => {

    return (
        <section className='order-summary'>
            <h4>Order Summary</h4>
            <ul className='payment'>
                <li className='d-flex'>
                    <p>Subtotal:</p>
                    <span>${total}</span>
                </li>
                <li className='d-flex'>
                    <p>Shipping:</p>
                    <span>Free</span>
                </li>
                <li className='d-flex'>
                    <p>Total:</p>
                    <span>${total}</span>
                </li>
            </ul>
            <PrimaryButton label='Process to checkout' onClick={()=> navigatePage(total)} />
        </section>
    )
};

export default OrderSummary;