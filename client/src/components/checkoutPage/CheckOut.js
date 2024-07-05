import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from './Form';
import SectionHeading2 from '../../global/customComponents/SectionHeading2';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import RadioBtn from '../../global/customComponents/RadioBtn';
import useProductsApi from '../../global/hooks/useProductsApi';
import OrderConfirmedPopUp from './OrderConfirmedPopUp';
import OrderSummaryModal from './OrderSummaryModal';



const CheckOut = () => {
    const { insertOrder } = useProductsApi('/orders')
    const { state } = useLocation();
    const data = state?.productsData;
    const payment = state?.totalPrice;

    
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [trackingId, setTrackingId] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [orderDetails, setOrderDetails] = useState({})
    const [ordersList, setOrdersList] = useState([])
    const [orderStatus, setOrderStatus] = useState('pending');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        streetAddress: '',
        city: '',
        phoneNumber: '',
    })

    useEffect(()=> {
        setOrderPlaced(localStorage.getItem('orderPlaced'))
    }, [orderPlaced])
    
    console.log(ordersList)


    const toggleModal = () => {
        setConfirmationModal(!confirmationModal)
    }
    const toggleOrderSummary = () => {
        setShowOrderSummary(!showOrderSummary);
    }

    const placeOrder = async (productsDetails) => {

        const regex = /@.*\gmail.com$/;
        if (!formData.email.includes('@') || !regex.test(formData.email)) {
            alert('Invalid email format');
        }
        if(selectedMethod === 'Bank' || selectedMethod === null) {
            alert('Select payment method (Bank payment method is not available)')
        } else {
            const orders = []
            const random = Math.floor(Math.random() * 1000).toString();
            const trackingId = Math.floor(Math.random() * 10000).toString();
            setTrackingId(trackingId)
    
            const orderId = `#${random}`;
            const customerName = formData.firstName;
            const items = JSON.stringify(productsDetails);
            const shippingAddress = formData.streetAddress;
            const orderPayment = payment;
            const paymentMethodSelected = selectedMethod;
            const status = orderStatus;

            const updatedOrder = {
                orderId, customerName, items, shippingAddress, orderPayment, paymentMethodSelected, status
            };
    
            await setOrderDetails(updatedOrder);
            // await insertOrder(updatedOrder);
            
            setOrderPlaced(true);
            localStorage.setItem('orderPlaced', true)
            toggleModal();
            orders.push(updatedOrder)
            setOrdersList(orders)
        }
    }

    return (
        <section className='check-out'>
            <OrderConfirmedPopUp
                show={confirmationModal}
                onHide={toggleModal}
                trackingId={trackingId}
            />
            <OrderSummaryModal
                show={showOrderSummary}
                onHide={toggleOrderSummary}
                data={ordersList}
            />
            <div className='container'>
                <SectionHeading2 title='Billing Details' />
                <div className='d-grid'>
                    <div className='billing-details'>
                        <Form
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                    <div className='order-details'>
                        <ul className='d-flex products-list'>
                            {data !== null && data !== '' && data.length > 0 && data.map((item) => {
                                return (
                                    <li className='d-flex'>
                                        <div className='d-flex'>
                                            <figure className='image-holder'>
                                                <img src={item.thumbnail} alt='image' />
                                            </figure>
                                            <h5>
                                                {item.title}
                                                <span> ({state?.quantity ? state.quantity : item.quantity ? item.quantity : 1})</span>
                                            </h5>
                                        </div>
                                        <p>${item.price}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className='payment'>
                            <li className='d-flex'>
                                <p>Subtotal:</p>
                                <span>${payment}</span>
                            </li>
                            <li className='d-flex'>
                                <p>Shipping:</p>
                                <span>Free</span>
                            </li>
                            <li className='d-flex'>
                                <p>Total:</p>
                                <span>${payment}</span>
                            </li>
                        </ul>
                        <div className='payment-methods'>
                            <li className='d-flex'>
                                <RadioBtn
                                    label='Bank'
                                    handleOptionClick={()=> setSelectedMethod('Bank')}
                                />
                                <div className='bank-payment-options'>
                                    <img src={require('../../assets/icons/master-card.png')} width={30} />
                                    <img src={require('../../assets/icons/visa.png')} width={30} />
                                </div>
                            </li>
                            <li className='d-flex'>
                                <RadioBtn
                                    label='Cash on delivery'
                                    handleOptionClick={()=> setSelectedMethod('Cash on delivery')}
                                />
                            </li>
                            <div className='buttons'>
                                <PrimaryButton
                                    label='Place Order'
                                    onClick={() => placeOrder(data)}
                                    customStyle={{
                                        backgroundColor: orderPlaced ? '#e27d7d' : null,
                                        border: orderPlaced ? '1px solid #e27d7d' : null,
                                        pointerEvents: orderPlaced ? 'none' : null,
                                    }}
                                />
                                {orderPlaced || ordersList !== null ?
                                    <button onClick={()=> setShowOrderSummary(true)} className='btn link' >See my orders...</button> : null
                                }
                            </div>
                            {orderPlaced &&
                                <>
                                    <p className='msg'>
                                        Order has been placed !
                                        <span>
                                            <Link to='/store-page'>  Go to Store</Link>
                                        </span>
                                    </p>
                                    <Link to='/order-tracking'>Track your order</Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default CheckOut;