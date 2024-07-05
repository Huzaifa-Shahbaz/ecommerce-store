import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsSelector, prodQuantitySelector, removeAll, removeFromCart } from '../../redux/slices/cartSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmptySideMenu from '../../global/customComponents/EmptySideMenu';
import emptyCartIcon from '../../assets/icons/empty-cart.png';
import Rating from '../../global/customComponents/Rating';
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import ProductCounter from './ProductCounter';
import SectionHeading2 from '../../global/customComponents/SectionHeading2';





const CartPage = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsSelector);
    const [productsData, setProductsData] = useState(cartItems);
    const [editCart, setEditCart] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = ()=> {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        setProductsData(cartItems)
        window.addEventListener('resize', handleResize);
        return ()=> {
            window.removeEventListener('resize', handleResize)
        }
    }, [cartItems])

    const navigate = useNavigate();
    const navigateToCheckOut = (orderPrice) => {
        navigate('/check-out', {
            state: {
                totalPrice: orderPrice,
                productsData: productsData,
            },
        })
    }

    //Add new key and update the quantity
    const handleCounterClick = (productId, updatedQuantity) => {
        setProductsData(prevProducts =>
            prevProducts.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        quantity: updatedQuantity ? updatedQuantity : 1,
                    }
                } else {
                    return product
                }
            })
        )
    }

    // calculates price of all products
    const productsTotalPrice = productsData?.reduce((total, product) => {
        const quantity = product.quantity || 1;
        return total + (product.price * quantity);
    }, 0);


    const imageBodyTemplate = (product) => {
        return (
            <figure className='image-holder'>
                <img src={product?.thumbnail} alt='image' />
            </figure>
        );
    };
    const counterBody = (product) => {
        return (
            <ProductCounter
                value={product.quantity ? product.quantity : '1'}
                onIncrement={() => handleCounterClick(product.id, product.quantity + 1)}
                onDecrement={() => handleCounterClick(product.id, Math.max(product.quantity - 1, 0))}
            />
        )
    }
    const productPrice = (product) => {
        return <span>${product.price}</span>
    }
    const reviews = (product) => {
        return (
            <div className='rating'>
                <Rating rating={product.rating} />
            </div>
        )
    }
    const footer = () => {
        return (
            <footer className='d-flex cart-footer'>
                <Link to='/products-page'>
                    <button className='btn'>Return to Shop</button>
                </Link>
                {editCart == true ? 
                    <button onClick={()=> dispatch(removeAll())} className='btn remove'> Remove All </button> : null
                }
                <button onClick={() => setEditCart(!editCart)} className='btn'>
                    {editCart === true ? 'Done' : 'Edit Cart'}
                </button>
            </footer>
        )
    }
    const deleteBody = (product) => {
        return (
            <button onClick={() => dispatch(removeFromCart(product.id))} className='btn remove-from-cart'>
                <figure className='icon-holder'>
                    <img src={require('../../assets/icons/remove-from-cart.png')} />
                </figure>
                <span>Remove from cart</span>
            </button>
        )
    }


    return (
        <section className='cart-page'>
            <div className='container'>
                <SectionHeading2 title='Shopping Cart' />
                <div className='cart-items'>
                    {productsData.length === 0 ?
                        <EmptySideMenu
                            icon={emptyCartIcon}
                            title='Cart is empty !'
                            text='Looks like you dont added any product to cart'
                        />
                        :
                        <>
                            <DataTable value={productsData} footer={footer} className='cartData-table' >
                                {editCart == true ? <Column body={deleteBody} ></Column> : null}
                                <Column body={imageBodyTemplate} header={'Image'} className='data-column'></Column>
                                <Column field={'title'} header={'Title'} className='data-column'></Column>
                                <Column body={counterBody} header={'Quantity'} className='data-column'></Column>
                                <Column body={productPrice} header={'Price'} className='data-column'></Column>
                                {windowWidth <= 768 ? null : <Column className='data-column' body={reviews} header={'Rating'}></Column> }
                            </DataTable>
                            <OrderSummary navigatePage={navigateToCheckOut}  total={productsTotalPrice}  />
                        </>
                    }
                </div>
            </div>
        </section>
    )
};

export default CartPage;