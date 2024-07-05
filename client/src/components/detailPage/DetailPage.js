import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { favMenu } from '../../redux/slices/favSlice';
import Counter from '../../global/customComponents/Counter';
import ThumbnailSwiper from './ThumbnailSwiper';
import Rating from '../../global/customComponents/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Services from './Services';
import RelatedProducts from './RelatedProducts';
import { prodQuantitySelector } from '../../redux/slices/cartSlice';




const DetailPage = () => {
    

    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();
    const prodQuantity = useSelector(prodQuantitySelector);
    

    const arrayData = []
    const product = {...state, quantity: prodQuantity,}
    const obj = arrayData.push(product)
    const [productImages, setProductImages] = useState(product.images);
    const swiperImages = JSON.parse(productImages)
    

    const navigateToCheckOut = (data)=> {

        navigate('/check-out', {
            state: {
                totalPrice: product.price * product.quantity,
                productsData: arrayData,
                // quantity: product.quantity,
            },
        })
    }

    const saveProd = (data)=> {
        dispatch(favMenu({proData: data, menuState: true,}))
    }


    return (
        <section className='details'>
            <div className='container'>
                <div className='product-details'>
                    <div className='left'>
                        <ThumbnailSwiper
                            images={ swiperImages }
                        />
                    </div>
                    <div className='right'>
                        <div className='description'>
                            <h3>{product?.title ? product.title : 'Title'}</h3>
                            <div className='rating'>
                                <Rating rating={product.rating} />
                            </div>
                            <span className='price'>${product?.price}</span>
                            <p className='details'>{product?.description ? product.description : 'Description'}</p>
                        </div>
                        <div className='buttons'>
                            <Counter />
                            <PrimaryButton label='Buy Now' onClick={()=> navigateToCheckOut(product)} />
                            <button onClick={()=> saveProd(state)} className='btn btn-save'>
                                <FavoriteBorderIcon width={60} />
                            </button>
                        </div>
                        <Services />
                    </div>
                </div>
                <RelatedProducts url={product.category_id} />
            </div>
        </section>
    )
};

export default DetailPage;