import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, favMenu } from '../../redux/slices/favSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart, cartItemsSelector } from '../../redux/slices/cartSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from './Rating';



const ProductCard = ({ contentLoading, data }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(cartItemsSelector);
    const favItems = useSelector(dataSelector);

    const productImage = JSON.parse(data?.images)

    const cart = (data) => {
        const findExistingProduct = cartItems.find((i) => i.id === data.id)
        findExistingProduct ? alert("product already existed") : dispatch(addToCart({ proData: data, }))
    }
    const addToFav = (data) => {
        const existingProduct = favItems.find((i) => i.id === data.id)
        existingProduct ? alert("product already existed") : dispatch(favMenu({ proData: data, menuState: true, }))
    }
    const viewDetails = (data) => {
        navigate('/details-page', { state: data, })
    }

    return (
        <div className='card'>
            <figure className='image-holder'>
                {contentLoading === true ?
                    <Skeleton animation="wave" variant='rectangular' height={'100%'} width={'100%'} />
                    :
                    <>
                        <div className='image-overlay'>
                            <FavoriteBorderIcon onClick={() => addToFav(data)} className='btn fav-btn' />
                        </div>
                        <button onClick={() => cart(data)} className='btn addToCart'>Add to Cart</button>
                        <img src={productImage[0] ? productImage[0] : require('../../assets/images/no-image-2.png')} alt="Product" />
                    </>
                }
            </figure>
            <div className='description'>
                {contentLoading === true ? <Skeleton animation="wave" variant='rectangular' /> :
                    <>
                        <h5>{data?.title}</h5>
                        <p>{data?.description}</p>
                    </>
                }

                {contentLoading === true ? <Skeleton animation="wave" variant='rectangular' /> :
                    <div className='d-flex price'>
                        <span>$ {data?.price}</span>
                    </div>
                }
                <div className='d-flex others'>
                    {contentLoading === true ? <Skeleton animation="wave" variant='rectangular' width={'50%'} />
                        :
                        <>
                            <div className='rating'>
                                <Rating rating={data.rating} />
                            </div>
                            <button onClick={() => viewDetails(data)} className='btn btn-underline'>View Details</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProductCard;